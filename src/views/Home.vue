<template>

    <!-- Filtro de órdenes -->
    <div v-if="ordenes.length" class="flex flex-col items-center mb-6">
        <label class="text-white font-semibold mb-2">Selecciona tu orden:</label>
        <select
            v-model="ordenSeleccionadaId"
            class="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <option v-for="orden in ordenes" :key="orden.orden_id" :value="orden.orden_id">
                Orden #{{ orden.orden_id }} - {{ orden.detalles[0]?.nombre_servicio || 'Servicio' }}
            </option>
        </select>
    </div>

    <!-- Barra de progreso de 3 estados -->
    <div v-if="ordenSeleccionada" class="w-full max-w-xl mx-auto mb-10">
        <div class="bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center border border-blue-700">
            <h2 class="text-2xl font-bold text-white text-center mb-6 tracking-wide">Estado del Servicio</h2>
            <div class="flex items-center justify-between w-full mb-2">
                <div v-for="(step, idx) in steps" :key="step.key" class="flex items-center w-1/3">
                    <div :class="[
                        'w-14 h-14 flex items-center justify-center rounded-full border-4 font-extrabold text-xl transition-all duration-300 shadow-md',
                        getStepClass(mapEstadoStepper(ordenSeleccionada.detalles[0]?.estado), step.key)
                    ]">
                        <span>{{ step.icon }}</span>
                    </div>
                    <div class="flex flex-col ml-3">
                        <span :class="getStepTextClass(mapEstadoStepper(ordenSeleccionada.detalles[0]?.estado), step.key) + ' text-base font-semibold drop-shadow'">{{ step.label }}</span>
                    </div>
                    <span v-if="idx < steps.length - 1" class="flex-1 h-2 mx-2 rounded transition-all duration-300 shadow-sm" :class="{
                        'bg-blue-500': mapEstadoStepper(ordenSeleccionada.detalles[0]?.estado) === steps[idx].key || mapEstadoStepper(ordenSeleccionada.detalles[0]?.estado) === steps[idx+1].key,
                        'bg-gray-600': mapEstadoStepper(ordenSeleccionada.detalles[0]?.estado) !== steps[idx].key && mapEstadoStepper(ordenSeleccionada.detalles[0]?.estado) !== steps[idx+1].key
                    }"></span>
                </div>
            </div>
        </div>
    </div>

    <!-- Estructura de dos columnas -->
    <div class="flex flex-wrap">
        <!-- Columna izquierda/central (75% en desktop) -->
    <div class="w-full lg:w-3/4 pr-0 lg:pr-4">
<section class="grid grid-cols-1 gap-8 px-8 md:grid-cols-2">
    <div class="bg-gray-800 md:col-span-2">
        <div class="mx-auto max-w-2xl px-4 py-1 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-8">
            <h2 class="text-2xl font-bold tracking-tight text-white">Servicios recomendados</h2>

            <div class="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            <div v-for="servicio in serviciosAleatorios" :key="servicio.servicio_id" 
                 class="w-full bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col p-6">
                <div class="flex-grow flex flex-col">
                    <div class="mb-4">
                        <div class="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                            Servicio Toyota
                        </div>
                        <h5 class="text-xl font-bold text-gray-900 mb-6 line-clamp-2">{{ servicio.nombre }}</h5>
                    </div>
                    
                    <div class="flex-grow flex items-center justify-center my-4">
                        <router-link 
                            :to="{ name: 'Servicios', query: { servicio: servicio.servicio_id }}"
                            class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105"
                        >
                            <span>Ver Detalles</span>
                            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                            </svg>
                        </router-link>
                    </div>
                    
                    <div class="mt-auto pt-4 border-t border-gray-100">
                        <div class="flex flex-col items-center">
                            <span class="text-sm text-gray-500">Precio desde</span>
                            <span class="text-3xl font-bold text-blue-600">${{ servicio.precio_estimado }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
            </section>
        </div>
        
        <!-- Columna derecha (25% en desktop) para las tarjetas personalizadas -->
        <div class="w-full lg:w-1/4 mt-8 lg:mt-0 sticky top-32">
            <div class="flex flex-col space-y-4 px-4">
                <!-- Tarjeta de Servicios acumulados (abajo) -->
                <!-- Eliminada la tarjeta de servicios acumulados -->
            </div>
        </div>
    </div>

    <!-- Botón destacado para agendar cita -->
    <div class="flex justify-end mb-8">
      <div class="bg-gradient-to-r from-indigo-700 via-blue-700 to-indigo-900 border-2 border-indigo-500 rounded-xl shadow-lg p-4 flex items-center space-x-4 hover:shadow-2xl transition">
        <svg class="w-10 h-10 text-white drop-shadow-lg" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="4" stroke="currentColor" stroke-width="2.5" fill="#6366f1"/>
          <path stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" d="M8 2v4M16 2v4M3 10h18M12 14v4M10 16h4"/>
        </svg>
        <div class="flex flex-col">
          <span class="text-lg font-bold text-white">¿Necesitas un servicio?</span>
          <span class="text-sm text-blue-200">Agenda tu cita fácilmente en línea</span>
        </div>
        <router-link
          to="/agendar-cita"
          class="ml-6 px-6 py-2 bg-white text-indigo-700 font-bold rounded-lg shadow hover:bg-indigo-600 hover:text-white transition text-lg border-2 border-indigo-400"
        >
          <span class="inline-flex items-center">
            <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10m-9 4h6m-7 5h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z"/>
            </svg>
            Agendar Cita
          </span>
        </router-link>
      </div>
    </div>

</template>

<script>
import axios from 'axios'
import { ref, onMounted, computed, watch } from 'vue'
import { useAuthStore } from '@/components/stores/auth'

const steps = [
  { key: 'abierta', label: 'Abierta', icon: '🟡' },
  { key: 'en progreso', label: 'En progreso', icon: '🔵' },
  { key: 'finalizada', label: 'Finalizada', icon: '🟢' }
]

const stepOrder = ['abierta', 'en progreso', 'finalizada']

function getStepClass(estado, stepKey) {
  const normEstado = (estado || '').toLowerCase().trim()
  const normStepKey = (stepKey || '').toLowerCase().trim()
  const currentIdx = stepOrder.indexOf(normEstado)
  const stepIdx = stepOrder.indexOf(normStepKey)
  if (stepIdx < currentIdx) {
    if (normStepKey === 'abierta') return 'bg-yellow-400 border-yellow-400 text-white';
    if (normStepKey === 'en progreso') return 'bg-blue-500 border-blue-500 text-white';
    if (normStepKey === 'finalizada') return 'bg-green-500 border-green-500 text-white';
  }
  if (stepIdx === currentIdx) {
    if (normStepKey === 'abierta') return 'bg-yellow-400 border-yellow-400 text-white animate-pulse';
    if (normStepKey === 'en progreso') return 'bg-blue-500 border-blue-500 text-white animate-pulse';
    if (normStepKey === 'finalizada') return 'bg-green-500 border-green-500 text-white animate-pulse';
  }
  return 'bg-gray-800 border-gray-600 text-gray-400';
}
function getStepTextClass(estado, stepKey) {
  const normEstado = (estado || '').toLowerCase().trim()
  const normStepKey = (stepKey || '').toLowerCase().trim()
  const currentIdx = stepOrder.indexOf(normEstado)
  const stepIdx = stepOrder.indexOf(normStepKey)
  if (stepIdx < currentIdx) {
    if (normStepKey === 'abierta') return 'text-yellow-400';
    if (normStepKey === 'en progreso') return 'text-blue-400';
    if (normStepKey === 'finalizada') return 'text-green-400';
  }
  if (stepIdx === currentIdx) {
    if (normStepKey === 'abierta') return 'text-yellow-400 font-bold';
    if (normStepKey === 'en progreso') return 'text-blue-400 font-bold';
    if (normStepKey === 'finalizada') return 'text-green-400 font-bold';
  }
  return 'text-gray-300';
}

function mapEstadoStepper(estado) {
  const norm = (estado || '').toLowerCase().trim()
  if (norm === 'pendiente') return 'en progreso'
  if (norm === 'completado') return 'finalizada'
  return 'abierta'
}

const serviciosAleatorios = ref([])

function getImagenServicio(nombreServicio) {
  const nombre = nombreServicio.toLowerCase();
  if (nombre.includes('aceite')) return '/Images/CambioAceiteyFiltro.jpg';
  if (nombre.includes('balanceo') || nombre.includes('alineación')) return '/Images/AlineacionYBalanceo.jpg';
  if (nombre.includes('bujía')) return '/Images/CambioBujias.jpg';
  if (nombre.includes('filtro')) return '/Images/LimpiezaFiltroAire.jpg';
  return '/Images/default-service.jpg';
}

async function cargarServiciosAleatorios() {
  try {
    const { data } = await axios.get('/api/servicios')
    // Mezclar y tomar 4 aleatorios
    const mezclados = data.sort(() => 0.5 - Math.random())
    serviciosAleatorios.value = mezclados.slice(0, 4)
  } catch (error) {
    console.error('Error al cargar servicios recomendados:', error)
    serviciosAleatorios.value = []
  }
}

export default {
  name: 'HomePage',
  setup() {
    const authStore = useAuthStore()
    const ordenes = ref([])
    const ordenSeleccionadaId = ref(null)
    const ordenSeleccionada = computed(() =>
      ordenes.value.find(o => o.orden_id === ordenSeleccionadaId.value)
    )
    const etapaActual = computed(() => {
      if (!ordenSeleccionada.value) return 0
      // Puedes ajustar este mapeo según los estados reales de tu backend
      const estado = (ordenSeleccionada.value.detalles[0]?.estado || '').toLowerCase()
      if (estado.includes('entrega')) return 4
      if (estado.includes('control')) return 3
      if (estado.includes('mantenimiento')) return 2
      if (estado.includes('progreso') || estado.includes('recibido')) return 1
      return 0 // Orden recibida
    })
    const progresoOrden = computed(() => (etapaActual.value / (etapas.length - 1)) * 100)
    const etapas = ref([
      { key: 'orden_recibida', label: 'Orden recibida' },
      { key: 'recibido', label: 'Recibido' },
      { key: 'mantenimiento', label: 'Mantenimiento' },
      { key: 'control_calidad', label: 'Control de Calidad' },
      { key: 'entrega', label: 'Entrega' }
    ])

    const cargarOrdenes = async () => {
      try {
        await authStore.restoreSession?.()
        const usuarioId = authStore.user?.id
        if (!usuarioId) return
        const { data } = await axios.get(`/api/ordenes-servicio/usuario/${usuarioId}`)
        ordenes.value = data
      } catch (error) {
        console.error('Error al cargar órdenes del usuario:', error)
      }
    }

    onMounted(() => {
      cargarOrdenes()
      cargarServiciosAleatorios()
      if (ordenes.value.length) {
        ordenSeleccionadaId.value = ordenes.value[0].orden_id
      }
    })

    return { 
      ordenes, 
      steps, 
      getStepClass, 
      getStepTextClass, 
      mapEstadoStepper, 
      serviciosAleatorios, 
      ordenSeleccionadaId, 
      ordenSeleccionada, 
      progresoOrden, 
      etapaActual, 
      etapas,
      getImagenServicio 
    }
  }
}
</script>