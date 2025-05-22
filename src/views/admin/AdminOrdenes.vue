<template>
  <div class="container mx-auto px-4 py-8">
    <h2 class="text-3xl font-bold text-white mb-6">Órdenes de Servicio</h2>
    <div class="bg-gray-800 rounded-lg p-6 shadow-lg">
      <table class="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <th class="px-4 py-2 text-left text-gray-300">ID</th>
            <th class="px-4 py-2 text-left text-gray-300">Cliente</th>
            <th class="px-4 py-2 text-left text-gray-300">Vehículo</th>
            <th class="px-4 py-2 text-left text-gray-300">Estado</th>
            <th class="px-4 py-2 text-left text-gray-300">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="orden in ordenes" :key="orden.orden_id" class="hover:bg-gray-700">
            <td class="px-4 py-2">{{ orden.orden_id }}</td>
            <td class="px-4 py-2">{{ orden.nombre_usuario }} {{ orden.apellido_usuario }}</td>
            <td class="px-4 py-2">{{ orden.marca_vehiculo }} {{ orden.modelo_vehiculo }} - {{ orden.placa_vehiculo }}</td>
            <td class="px-4 py-2">{{ orden.estado }}</td>
            <td class="px-4 py-2">
              <button @click="verDetalle(orden.orden_id)" class="text-blue-400 hover:underline">Ver Detalle</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default {
  name: 'AdminOrdenes',
  setup() {
    const ordenes = ref([])
    const router = useRouter()
    const cargarOrdenes = async () => {
      try {
        const { data } = await axios.get('/api/ordenes-servicio')
        // Filtrar solo abiertas o en proceso
        ordenes.value = data.filter(o => o.estado === 'abierta' || o.estado === 'en proceso')
      } catch (error) {
        console.error('Error al cargar órdenes:', error)
      }
    }
    const verDetalle = (id) => {
      router.push(`/admin/ordenes/${id}`)
    }
    onMounted(cargarOrdenes)
    return { ordenes, verDetalle }
  }
}
</script> 