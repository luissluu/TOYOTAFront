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
  <div v-if="ordenSeleccionada" class="w-full max-w-xl mx-auto mb-8">
      <h2 class="text-2xl font-bold text-white text-center mb-4">Estado del Servicio</h2>
      <div class="flex items-center justify-between w-full mb-4">
          <div v-for="(step, idx) in steps" :key="step.key" class="flex items-center w-1/3">
              <div :class="[
                  'w-12 h-12 flex items-center justify-center rounded-full border-2 font-bold text-lg transition-all duration-300',
                  getStepClass(mapEstadoStepper(ordenSeleccionada.detalles[0]?.estado), step.key)
              ]">
                  <span>{{ step.icon }}</span>
              </div>
              <div class="flex flex-col ml-2">
                  <span :class="getStepTextClass(mapEstadoStepper(ordenSeleccionada.detalles[0]?.estado), step.key)">{{ step.label }}</span>
              </div>
              <span v-if="idx < steps.length - 1" class="flex-1 h-1 mx-2 rounded transition-all duration-300" :class="{
                  'bg-blue-500': mapEstadoStepper(ordenSeleccionada.detalles[0]?.estado) === steps[idx].key || mapEstadoStepper(ordenSeleccionada.detalles[0]?.estado) === steps[idx+1].key,
                  'bg-gray-600': mapEstadoStepper(ordenSeleccionada.detalles[0]?.estado) !== steps[idx].key && mapEstadoStepper(ordenSeleccionada.detalles[0]?.estado) !== steps[idx+1].key
              }"></span>
          </div>
      </div>
      <div class="flex justify-center">
          <div class="bg-gray-700 rounded-lg px-4 py-2 inline-flex items-center">
              <svg class="w-5 h-5 text-blue-300 mr-2" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
                  <path d="M12 7V12L15 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <div>
                  <p class="text-xs text-blue-200">Tiempo estimado de entrega</p>
                  <p class="text-base font-bold text-white">1:30 horas</p>
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
          <div v-for="servicio in serviciosAleatorios" :key="servicio.servicio_id" class="w-full bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col">
              <div class="px-5 py-4 flex-grow flex flex-col">
                  <a href="#" class="mb-auto">
                      <h5 class="text-xl font-semibold tracking-tight text-gray-900 h-14">{{ servicio.nombre }}</h5>
                  </a>
                  <div class="flex items-center mt-2 mb-4">
                      <div class="flex items-center space-x-1 rtl:space-x-reverse">
                          <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20"><path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/></svg>
                      </div>
                      <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm ms-3">{{ servicio.calificacion || '4.0' }}</span>
                  </div>
                  <div class="flex items-center justify-between mt-auto">
                      <span class="text-3xl font-bold text-gray-900">${{ servicio.precio_estimado }}</span>
                      <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Agregar</a>
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
              <div class="flex items-center px-6 py-8 bg-gray-500 rounded-lg shadow-md shadow-black">
                  <div class="flex items-center -mx-2">
                      <svg class="mx-2" width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="35" cy="35" r="35" fill="#222222" fill-opacity="0.8" />
                          <path d="M46.75 26.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z M29.867 39.125h.008v.008h-.008v-.008Z" stroke="#b60c0c" stroke-width="2" stroke-linecap="square" />
                      </svg>

                      <div class="mx-2">
                          <h3 class="text-2xl font-medium text-white">7</h3>
                          <p class="mt-1 text-sm text-white">Servicios acumulados</p>
                      </div>
                  </div>
              </div>
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

  return { ordenes, steps, getStepClass, getStepTextClass, mapEstadoStepper, serviciosAleatorios, ordenSeleccionadaId, ordenSeleccionada, progresoOrden, etapaActual, etapas }
}
}
</script>