<template>
  <div class="container mx-auto py-8 px-4">
    <h2 class="text-3xl font-bold text-white mb-6">Servicios Automotrices Toyota</h2>
    <p class="text-gray-300 mb-8">
      Cuidamos tu vehículo con la más alta calidad y garantía. Todos nuestros servicios incluyen mano de obra certificada y refacciones originales.
    </p>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="servicio in servicios" :key="servicio.servicio_id" class="bg-white rounded-lg shadow p-6 flex flex-col">
        <h4 class="text-lg font-semibold text-gray-900 mb-2">{{ servicio.nombre }}</h4>
        <p class="text-gray-600 mb-4">{{ servicio.descripcion }}</p>
        <div class="flex items-center mt-auto justify-between">
          <span class="text-2xl font-bold text-gray-900">${{ servicio.precio_estimado }}</span>
          <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg">Solicitar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ref, onMounted } from 'vue'

const servicios = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get('/api/servicios')
    servicios.value = data
  } catch (error) {
    console.error('Error al cargar servicios:', error)
  }
})

export default {
  name: 'Servicios',
  setup() {
    return { servicios }
  }
}
</script>