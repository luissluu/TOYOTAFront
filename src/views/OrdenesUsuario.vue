<template>
  <div class="container mx-auto py-8 px-4">
    <h2 class="text-2xl font-bold text-white mb-6">Todas tus órdenes</h2>
    <div v-if="ordenes.length">
      <div v-for="orden in ordenes" :key="orden.orden_id" class="mb-8">
        <h3 class="text-base font-semibold text-blue-300 mb-4">Orden #{{ orden.orden_id }}</h3>
        <div v-for="servicio in orden.detalles" :key="servicio.detalle_id" class="mb-6">
          <div class="text-white font-medium mb-2">{{ servicio.nombre_servicio }}</div>
          <div class="flex items-center justify-start gap-4">
            <div v-for="(step, idx) in steps" :key="step.key" class="flex items-center">
              <div :class="[
                'w-10 h-10 flex items-center justify-center rounded-full border-2 font-bold',
                getStepClass(servicio.estado, step.key),
                servicio.estado === step.key ? 'animate-pulse' : ''
              ]">
                <span>{{ step.icon }}</span>
              </div>
              <span class="ml-2 text-sm font-semibold" :class="getStepTextClass(servicio.estado, step.key)">{{ step.label }}</span>
              <span v-if="idx < steps.length - 1" class="w-8 h-1 bg-gray-600 mx-2 rounded"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-gray-400 italic">No tienes órdenes registradas.</div>
    <div class="flex justify-center mt-8">
      <router-link to="/home" class="px-6 py-2 bg-gray-700 hover:bg-gray-800 text-white font-bold rounded-lg shadow transition">
        Volver al Home
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/components/stores/auth'

const steps = [
  { key: 'abierta', label: 'Abierta', icon: '🟡' },
  { key: 'en progreso', label: 'En progreso', icon: '🔵' },
  { key: 'finalizada', label: 'Finalizada', icon: '🟢' }
]

function getStepClass(estado, stepKey) {
  if (estado === stepKey) {
    if (stepKey === 'abierta') return 'bg-yellow-400 border-yellow-400 text-white';
    if (stepKey === 'en progreso') return 'bg-blue-500 border-blue-500 text-white';
    if (stepKey === 'finalizada') return 'bg-green-500 border-green-500 text-white';
  }
  return 'bg-gray-800 border-gray-600 text-gray-400';
}
function getStepTextClass(estado, stepKey) {
  if (estado === stepKey) {
    if (stepKey === 'abierta') return 'text-yellow-400';
    if (stepKey === 'en progreso') return 'text-blue-400';
    if (stepKey === 'finalizada') return 'text-green-400';
  }
  return 'text-gray-300';
}

export default {
  name: 'OrdenesUsuario',
  setup() {
    const authStore = useAuthStore()
    const ordenes = ref([])

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
    })

    return { ordenes, steps, getStepClass, getStepTextClass }
  }
}
</script>

<style scoped>
.container {
  max-width: 900px;
}
</style> 