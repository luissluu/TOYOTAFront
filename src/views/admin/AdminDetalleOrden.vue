<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12">
    <div class="container mx-auto px-4">
      <!-- Encabezado -->
      <div class="mb-8">
        <div class="flex items-center gap-4 mb-2">
          <button 
            @click="$router.push('/admin/ordenes')"
            class="text-gray-400 hover:text-white transition duration-200"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h2 class="text-4xl font-bold text-white">Orden #{{ ordenId }}</h2>
        </div>
        <p class="text-gray-400">Detalles y gestión de la orden de servicio</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Información Principal -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Tarjeta de Información del Cliente -->
          <div class="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700 transform transition-all duration-300 hover:border-blue-500">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                <span class="text-white text-lg font-medium">
                  {{ obtenerIniciales(orden?.nombre_usuario, orden?.apellido_usuario) }}
                </span>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-white">{{ orden?.nombre_usuario }} {{ orden?.apellido_usuario }}</h3>
                <p class="text-gray-400">Cliente</p>
              </div>
            </div>

            <!-- Información del Vehículo -->
            <div class="bg-gray-700/50 rounded-lg p-4 mb-6">
              <div class="flex items-center gap-3">
                <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
                <div>
                  <p class="text-white font-medium">{{ orden?.marca_vehiculo }} {{ orden?.modelo_vehiculo }}</p>
                  <p class="text-sm text-gray-400">{{ orden?.placa_vehiculo }}</p>
                </div>
              </div>
            </div>

            <!-- Diagnóstico y Notas -->
            <div class="space-y-4">
              <div>
                <h4 class="text-sm font-medium text-gray-400 mb-2">Diagnóstico</h4>
                <p class="text-white bg-gray-700/50 rounded-lg p-4">{{ orden?.diagnostico }}</p>
              </div>
              <div v-if="orden?.notas">
                <h4 class="text-sm font-medium text-gray-400 mb-2">Notas Adicionales</h4>
                <p class="text-white bg-gray-700/50 rounded-lg p-4">{{ orden?.notas }}</p>
              </div>
            </div>
          </div>

          <!-- Lista de Servicios -->
          <div class="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700">
            <h3 class="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Servicios
            </h3>

            <div class="space-y-4">
              <transition-group
                enter-active-class="transition duration-300 ease-out"
                enter-from-class="transform translate-x-4 opacity-0"
                enter-to-class="transform translate-x-0 opacity-100"
                leave-active-class="transition duration-200 ease-in"
                leave-from-class="transform translate-x-0 opacity-100"
                leave-to-class="transform -translate-x-4 opacity-0"
              >
                <div 
                  v-for="detalle in detalles" 
                  :key="detalle.detalle_id"
                  class="bg-gray-700/50 rounded-lg p-4 flex flex-col md:flex-row gap-4 items-start"
                >
                  <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                      <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h4 class="text-lg font-medium text-white">{{ detalle.nombre_servicio }}</h4>
                    </div>
                    <div class="flex items-center gap-2 text-gray-400">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>{{ detalle.nombre_mecanico }} {{ detalle.apellido_mecanico }}</span>
                    </div>
                  </div>
                  <div class="flex items-center gap-4">
                    <span class="text-lg font-semibold text-white">${{ detalle.precio }}</span>
                    <button 
                      v-if="detalle.estado !== 'completado'"
                      @click="marcarCompletado(detalle.detalle_id)"
                      class="bg-green-500/20 text-green-400 px-4 py-2 rounded-lg hover:bg-green-500/30 transition duration-200 flex items-center gap-2"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Completar
                    </button>
                    <span 
                      v-else 
                      class="bg-green-500/20 text-green-400 px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Completado
                    </span>
                  </div>
                </div>
              </transition-group>
            </div>
          </div>
        </div>

        <!-- Panel Lateral -->
        <div class="space-y-6">
          <!-- Estado y Total -->
          <div class="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700">
            <div class="mb-6">
              <h4 class="text-sm font-medium text-gray-400 mb-2">Estado Actual</h4>
              <span 
                :class="[
                  'px-4 py-2 rounded-full text-sm font-medium inline-flex items-center gap-2',
                  orden?.estado === 'abierta' ? 'bg-yellow-500/20 text-yellow-400' : 
                  orden?.estado === 'en proceso' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-green-500/20 text-green-400'
                ]"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ orden?.estado }}
              </span>
            </div>
            <div>
              <h4 class="text-sm font-medium text-gray-400 mb-2">Total Estimado</h4>
              <p class="text-3xl font-bold text-white">${{ orden?.total }}</p>
            </div>
          </div>

          <!-- Botón Finalizar -->
          <transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
          >
            <button 
              v-if="puedeFinalizar"
              @click="finalizarOrden"
              class="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Finalizar Orden
            </button>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../components/stores/auth'
import { notificacionStore } from '../../components/stores/notificacion'
import ToastNotificacion from '../../components/ui/ToastNotificacion.vue'

export default {
  name: 'AdminDetalleOrden',
  components: {
    ToastNotificacion
  },
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
        notificacionStore.mostrar('Error al cargar la orden', 'error')
      }
    }

    const cargarDetalles = async () => {
      try {
        const { data } = await axios.get(`/api/detalles-orden/orden/${ordenId}`)
        detalles.value = data
      } catch (error) {
        console.error('Error al cargar detalles:', error)
        notificacionStore.mostrar('Error al cargar los detalles', 'error')
      }
    }

    const marcarCompletado = async (detalleId) => {
      try {
        await axios.put(`/api/detalles-orden/${detalleId}/estado`, { estado: 'completado' })
        await cargarDetalles()
        notificacionStore.mostrar('Servicio marcado como completado', 'success')
      } catch (error) {
        notificacionStore.mostrar('Error al marcar como completado', 'error')
      }
    }

    const puedeFinalizar = computed(() => {
      return detalles.value.length > 0 && 
             detalles.value.every(d => d.estado === 'completado') && 
             orden.value && 
             orden.value.estado !== 'finalizada'
    })

    const finalizarOrden = async () => {
      try {
        await axios.put(`/api/ordenes-servicio/${ordenId}/finalizar`, { usuario_id: authStore.user?.id })
        notificacionStore.mostrar('Orden finalizada correctamente', 'success')
        router.push('/admin/ordenes')
      } catch (error) {
        notificacionStore.mostrar('Error al finalizar la orden', 'error')
      }
    }

    const obtenerIniciales = (nombre, apellido) => {
      if (!nombre || !apellido) return ''
      return `${nombre.charAt(0)}${apellido.charAt(0)}`
    }

    onMounted(() => {
      cargarOrden()
      cargarDetalles()
    })

    return { 
      ordenId, 
      orden, 
      detalles, 
      marcarCompletado, 
      puedeFinalizar, 
      finalizarOrden,
      obtenerIniciales,
      notificacion: notificacionStore.state
    }
  }
}
</script> 