<template>
  <div class="container mx-auto px-4 py-8">
    <h2 class="text-3xl font-bold text-white mb-6">Detalle de Orden #{{ ordenId }}</h2>
    <div class="bg-gray-800 rounded-lg p-6 shadow-lg mb-6">
      <div v-if="orden">
        <p class="text-gray-200 mb-2"><strong>Cliente:</strong> {{ orden.nombre_usuario }} {{ orden.apellido_usuario }}</p>
        <p class="text-gray-200 mb-2"><strong>Vehículo:</strong> {{ orden.marca_vehiculo }} {{ orden.modelo_vehiculo }} - {{ orden.placa_vehiculo }}</p>
        <p class="text-gray-200 mb-2"><strong>Estado:</strong> {{ orden.estado }}</p>
        <p class="text-gray-200 mb-2"><strong>Diagnóstico:</strong> {{ orden.diagnostico }}</p>
        <p class="text-gray-200 mb-2"><strong>Notas:</strong> {{ orden.notas }}</p>
        <p class="text-gray-200 mb-2"><strong>Total:</strong> ${{ orden.total }}</p>
      </div>
    </div>
    <div class="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h3 class="text-xl font-semibold text-white mb-4">Servicios</h3>
      <table class="min-w-full divide-y divide-gray-700 mb-4">
        <thead>
          <tr>
            <th class="px-4 py-2 text-left text-gray-300">Servicio</th>
            <th class="px-4 py-2 text-left text-gray-300">Mecánico</th>
            <th class="px-4 py-2 text-left text-gray-300">Estado</th>
            <th class="px-4 py-2 text-left text-gray-300">Precio</th>
            <th class="px-4 py-2 text-left text-gray-300">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="detalle in detalles" :key="detalle.detalle_id" class="hover:bg-gray-700">
            <td class="px-4 py-2">{{ detalle.nombre_servicio }}</td>
            <td class="px-4 py-2">{{ detalle.nombre_mecanico }} {{ detalle.apellido_mecanico }}</td>
            <td class="px-4 py-2">{{ detalle.estado }}</td>
            <td class="px-4 py-2">${{ detalle.precio }}</td>
            <td class="px-4 py-2">
              <button v-if="detalle.estado !== 'completado'" @click="marcarCompletado(detalle.detalle_id)" class="text-green-400 hover:underline">Marcar como completado</button>
              <span v-else class="text-green-500 font-bold">Completado</span>
            </td>
          </tr>
        </tbody>
      </table>
      <button v-if="puedeFinalizar" @click="finalizarOrden" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Finalizar Orden</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../components/stores/auth'

export default {
  name: 'AdminDetalleOrden',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const authStore = useAuthStore()
    const ordenId = route.params.id
    const orden = ref(null)
    const detalles = ref([])
    const cargarOrden = async () => {
      try {
        const { data } = await axios.get(`/api/ordenes-servicio/${ordenId}`)
        orden.value = data
      } catch (error) {
        console.error('Error al cargar orden:', error)
      }
    }
    const cargarDetalles = async () => {
      try {
        const { data } = await axios.get(`/api/detalles-orden/orden/${ordenId}`)
        detalles.value = data
      } catch (error) {
        console.error('Error al cargar detalles:', error)
      }
    }
    const marcarCompletado = async (detalleId) => {
      try {
        await axios.put(`/api/detalles-orden/${detalleId}/estado`, { estado: 'completado' })
        await cargarDetalles()
      } catch (error) {
        alert('Error al marcar como completado')
      }
    }
    const puedeFinalizar = computed(() => {
      return detalles.value.length > 0 && detalles.value.every(d => d.estado === 'completado') && orden.value && orden.value.estado !== 'finalizada'
    })
    const finalizarOrden = async () => {
      try {
        await axios.put(`/api/ordenes-servicio/${ordenId}/finalizar`, { usuario_id: authStore.user?.id })
        alert('Orden finalizada correctamente')
        router.push('/admin/ordenes')
      } catch (error) {
        alert('Error al finalizar la orden')
      }
    }
    onMounted(() => {
      cargarOrden()
      cargarDetalles()
    })
    return { ordenId, orden, detalles, marcarCompletado, puedeFinalizar, finalizarOrden }
  }
}
</script> 