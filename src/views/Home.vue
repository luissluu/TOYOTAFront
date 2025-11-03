<template>

    <!-- Filtro de órdenes -->
    <div v-if="ordenes.length" class="flex flex-col items-center mb-10">
      <label class="text-white font-semibold mb-2 text-base">Selecciona tu orden</label>
      <div class="relative w-full max-w-md">
        <select
          v-model="ordenSeleccionadaId"
          class="appearance-none w-full bg-gray-800 text-white px-5 py-3 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#EB0A1E] focus:border-[#EB0A1E] transition-all duration-200 cursor-pointer hover:border-gray-500 pr-12"
        >
          <option disabled value="">Selecciona una orden...</option>
          <option v-for="orden in ordenes" :key="orden.orden_id" :value="orden.orden_id">
            Orden #{{ orden.orden_id }} · {{ orden.detalles[0]?.nombre_servicio || 'Servicio' }}
          </option>
        </select>
        <span class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-300">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </div>
      <p class="mt-2 text-xs text-gray-400">{{ ordenes.length }} órdenes encontradas</p>
    </div>

    <!-- Barra de progreso de 3 estados (mejorada) -->
    <div v-if="ordenSeleccionada" class="w-full max-w-3xl mx-auto mb-10">
      <div class="bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 border border-gray-700">
        <div class="flex items-center justify-between mb-5">
          <h2 class="text-xl md:text-2xl font-bold text-white">Estado del servicio</h2>
          <span class="text-sm text-gray-300">{{ currentStep + 1 }} / {{ steps.length }}</span>
        </div>

        <!-- Línea de progreso -->
        <div class="relative h-2 w-full rounded-full bg-gray-700">
          <div class="absolute left-0 top-0 h-2 rounded-full bg-gradient-to-r from-[#EB0A1E] to-[#d00919] transition-all duration-500" :style="{ width: progressPercent + '%' }"></div>
        </div>

        <!-- Marcadores -->
        <div class="mt-6 grid grid-cols-3 gap-4">
          <div v-for="(step, idx) in steps" :key="step.key" class="flex items-center gap-3">
            <div :class="[
              'flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors duration-300',
              idx <= currentStep ? 'bg-[#EB0A1E] text-white border-[#EB0A1E]' : 'bg-gray-900 text-gray-400 border-gray-600'
            ]">
              {{ idx + 1 }}
            </div>
            <div class="min-w-0">
              <p :class="[ 'text-sm font-medium', idx <= currentStep ? 'text-white' : 'text-gray-300' ]">{{ step.label }}</p>
            </div>
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

            <div class="mt-2 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <div
                v-for="servicio in serviciosAleatorios"
                :key="servicio.servicio_id || servicio.id"
                class="group w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl cursor-pointer"
                @click="abrirModal(servicio)"
              >
                <!-- Contenido -->
                <div class="flex h-full flex-col p-6">
                  <h5 class="mb-3 line-clamp-2 text-lg font-bold text-gray-900 leading-tight">
                    {{ servicio.nombre || servicio.titulo }}
                  </h5>
                  <p v-if="servicio.descripcion" class="mb-5 line-clamp-3 text-sm text-gray-600 leading-relaxed">
                    {{ servicio.descripcion }}
                  </p>

                  <div class="mt-auto flex flex-col items-start gap-3 pt-4 border-t border-gray-100">
                    <div class="min-w-0">
                      <span class="block text-xs text-gray-500 mb-1">Precio desde</span>
                      <span class="text-2xl font-extrabold text-[#EB0A1E] tracking-tight whitespace-nowrap">{{ formatCurrency(servicio.precio_estimado || servicio.precio) }}</span>
                    </div>
                    <button
                      type="button"
                      class="inline-flex items-center rounded-lg bg-[#EB0A1E] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#d00919] hover:shadow-md hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB0A1E] focus-visible:ring-offset-2 self-start shrink-0"
                      @click.stop="abrirModal(servicio)"
                    >
                      Ver detalles
                      <svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
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

    <!-- Modal servicio recomendado -->
    <teleport to="body">
      <transition name="modal-fade">
        <div v-if="modalAbierto" class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4" @click.self="cerrarModal">
          <div class="relative z-[10000] w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl transform transition-all">
          <button class="absolute right-4 top-4 text-gray-400 hover:text-gray-700 transition-colors text-2xl leading-none" @click="cerrarModal" aria-label="Cerrar">&times;</button>
          <h3 class="mb-3 text-2xl font-bold text-gray-900 pr-8">{{ servicioSeleccionado?.nombre || servicioSeleccionado?.titulo }}</h3>
          <p v-if="servicioSeleccionado?.descripcion" class="mb-6 text-sm text-gray-600 leading-relaxed">{{ servicioSeleccionado.descripcion }}</p>
          <div class="mb-8 pb-6 border-b border-gray-200">
            <span class="block text-xs text-gray-500 mb-1">Precio desde</span>
            <span class="text-3xl font-extrabold text-[#EB0A1E] tracking-tight">{{ formatCurrency(servicioSeleccionado?.precio_estimado || servicioSeleccionado?.precio) }}</span>
          </div>
          <div class="flex justify-end gap-3">
            <button class="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors" @click="cerrarModal">Cerrar</button>
            <router-link
              :to="{ name: 'Servicios', query: { servicio: (servicioSeleccionado?.servicio_id || servicioSeleccionado?.id) } }"
              class="inline-flex items-center rounded-lg bg-[#EB0A1E] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#d00919] hover:shadow-md"
              @click.native="cerrarModal"
            >
              Ver más
              <svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </router-link>
          </div>
          </div>
        </div>
      </transition>
    </teleport>
    <!-- Botón destacado para agendar cita -->
    <div class="flex justify-end mb-8">
      <div class="bg-gradient-to-r from-[#EB0A1E] to-[#d00919] border-2 border-[#EB0A1E]/30 rounded-xl shadow-lg p-5 flex items-center space-x-5 hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5">
        <svg class="w-10 h-10 text-white drop-shadow-lg flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2" fill="rgba(255,255,255,0.1)"/>
          <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M8 2v4M16 2v4M3 10h18M12 14v4M10 16h4"/>
        </svg>
        <div class="flex flex-col">
          <span class="text-lg font-bold text-white">¿Necesitas un servicio?</span>
          <span class="text-sm text-white/90">Agenda tu cita fácilmente en línea</span>
        </div>
        <router-link
          to="/agendar-cita"
          class="ml-6 px-6 py-2.5 bg-white text-[#EB0A1E] font-bold rounded-lg shadow-md hover:bg-gray-50 hover:shadow-lg transition-all duration-200 border-2 border-white/20 hover:scale-105"
        >
          <span class="inline-flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10m-9 4h6m-7 5h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z"/>
            </svg>
            Agendar Cita
          </span>
        </router-link>
      </div>
    </div>

</template>

<script>
import axios from '../axios'
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

// Progreso (3 pasos)
const currentStep = computed(() => {
  const estado = mapEstadoStepper(ordenSeleccionada?.value?.detalles?.[0]?.estado)
  return Math.max(0, stepOrder.indexOf(estado))
})
const progressPercent = computed(() => {
  if (steps.length <= 1) return 100
  return (currentStep.value / (steps.length - 1)) * 100
})

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

function formatCurrency(value) {
  const num = Number(value) || 0
  return num.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).replace('MX$\u00a0', '$')
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

    const modalAbierto = ref(false)
    const servicioSeleccionado = ref(null)

    function abrirModal(servicio) {
      servicioSeleccionado.value = servicio
      modalAbierto.value = true
    }

    function cerrarModal() {
      modalAbierto.value = false
      servicioSeleccionado.value = null
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
      getImagenServicio,
      formatCurrency,
      modalAbierto,
      servicioSeleccionado,
      abrirModal,
      cerrarModal 
    }
  }
}
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-active > div,
.modal-fade-leave-active > div {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from > div,
.modal-fade-leave-to > div {
  transform: scale(0.95) translateY(-10px);
  opacity: 0;
}
</style>