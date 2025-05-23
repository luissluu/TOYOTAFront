<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12">
    <div class="container mx-auto px-4">
      <!-- Encabezado -->
      <div class="mb-8 text-center">
        <h2 class="text-4xl font-bold text-white mb-2">Órdenes de Servicio</h2>
        <p class="text-gray-400">Gestiona y monitorea las órdenes de servicio activas</p>
      </div>

      <!-- Filtros y Búsqueda -->
      <div class="mb-6 flex flex-col md:flex-row gap-4 items-center">
        <div class="flex gap-4 w-full">
          <div class="relative flex-1">
            <input 
              type="text" 
              v-model="busqueda" 
              placeholder="Buscar orden..." 
              class="bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            >
            <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <select 
            v-model="filtroEstado" 
            class="bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Abierta</option>
            <option value="en proceso">En Proceso</option>
            <option value="finalizada">Finalizada</option>
          </select>
        </div>
      </div>

      <!-- Grid de Órdenes -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <transition-group
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <div 
            v-for="orden in ordenesFiltradas" 
            :key="orden.orden_id"
            class="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700 hover:border-blue-500 transition duration-200 cursor-pointer"
            @click="verDetalle(orden.orden_id)"
          >
            <!-- Encabezado de la Orden -->
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="text-lg font-semibold text-white">Orden #{{ orden.orden_id }}</h3>
                <p class="text-sm text-gray-400">{{ formatearFecha(orden.fecha_inicio) }}</p>
              </div>
              <span 
                :class="[
                  'px-3 py-1 rounded-full text-sm font-medium',
                  orden.estado === 'abierta' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'
                ]"
              >
                {{ orden.estado }}
              </span>
            </div>

            <!-- Información del Cliente -->
            <div class="mb-4">
              <div class="flex items-center gap-3 mb-2">
                <div class="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                  <span class="text-white font-medium">
                    {{ obtenerIniciales(orden.nombre_usuario, orden.apellido_usuario) }}
                  </span>
                </div>
                <div>
                  <p class="text-white font-medium">{{ orden.nombre_usuario }} {{ orden.apellido_usuario }}</p>
                  <p class="text-sm text-gray-400">Cliente</p>
                </div>
              </div>
            </div>

            <!-- Información del Vehículo -->
            <div class="bg-gray-700/50 rounded-lg p-4">
              <div class="flex items-center gap-3">
                <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
                <div>
                  <p class="text-white font-medium">{{ orden.marca_vehiculo }} {{ orden.modelo_vehiculo }}</p>
                  <p class="text-sm text-gray-400">{{ orden.placa_vehiculo }}</p>
                </div>
              </div>
            </div>

            <!-- Botón de Acción -->
            <div class="mt-4 flex justify-end">
              <button 
                @click.stop="verDetalle(orden.orden_id)"
                class="text-blue-400 hover:text-blue-300 transition duration-200 flex items-center gap-2"
              >
                Ver Detalles
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </transition-group>
      </div>

      <!-- Mensaje cuando no hay órdenes -->
      <div v-if="ordenesFiltradas.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p class="text-gray-400 text-lg">No hay órdenes de servicio activas</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { notificacionStore } from '../../components/stores/notificacion'
import ToastNotificacion from '../../components/ui/ToastNotificacion.vue'

export default {
  name: 'AdminOrdenes',
  components: {
    ToastNotificacion
  },
  setup() {
    const ordenes = ref([])
    const router = useRouter()
    const busqueda = ref('')
    const filtroEstado = ref('')

    const cargarOrdenes = async () => {
      try {
        const { data } = await axios.get('/api/ordenes-servicio')
        ordenes.value = data.filter(o => o.estado === 'abierta' || o.estado === 'en progreso')
      } catch (error) {
        console.error('Error al cargar órdenes:', error)
        notificacionStore.mostrar('Error al cargar las órdenes', 'error')
      }
    }

    const ordenesFiltradas = computed(() => {
      return ordenes.value.filter(orden => {
        const coincideBusqueda = busqueda.value === '' || 
          orden.orden_id.toString().includes(busqueda.value) ||
          orden.nombre_usuario.toLowerCase().includes(busqueda.value.toLowerCase()) ||
          orden.apellido_usuario.toLowerCase().includes(busqueda.value.toLowerCase()) ||
          orden.placa_vehiculo.toLowerCase().includes(busqueda.value.toLowerCase())
        
        const coincideEstado = filtroEstado.value === '' ? orden.estado === 'abierta' : orden.estado === filtroEstado.value
        
        return coincideBusqueda && coincideEstado
      })
    })

    const verDetalle = (id) => {
      router.push(`/admin/ordenes/${id}`)
    }

    const formatearFecha = (fecha) => {
      return new Date(fecha).toLocaleString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    const obtenerIniciales = (nombre, apellido) => {
      return `${nombre.charAt(0)}${apellido.charAt(0)}`
    }

    onMounted(cargarOrdenes)

    return { 
      ordenes, 
      ordenesFiltradas,
      busqueda,
      filtroEstado,
      verDetalle,
      formatearFecha,
      obtenerIniciales,
      notificacion: notificacionStore.state
    }
  }
}
</script> 

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style> 