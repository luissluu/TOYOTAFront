<template>
  <div class="min-h-screen bg-gray-900 flex flex-col justify-center items-center py-12">
    <div class="bg-gray-800 rounded-3xl shadow-2xl p-8 w-full max-w-lg flex flex-col items-center border-2 border-blue-500">
      <div class="flex flex-col items-center mb-6">
        <svg class="w-16 h-16 text-blue-500 mb-2 drop-shadow-lg" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="4" stroke="currentColor" stroke-width="2.5" fill="#2563eb"/>
          <path stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" d="M8 2v4M16 2v4M3 10h18M12 14v4M10 16h4"/>
        </svg>
        <h2 class="text-3xl font-extrabold text-white mb-1 text-center">Agendar Nueva Cita</h2>
        <p class="text-gray-300 text-sm text-center">Completa el formulario para reservar tu servicio</p>
      </div>
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 w-full text-center">
        {{ error }}
      </div>
      <div v-if="success" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 w-full text-center">
        {{ success }}
      </div>
      <form @submit.prevent="handleSubmit" class="space-y-6 w-full">
        <div>
          <label class="block text-sm font-medium text-gray-200 mb-1">
            Vehículo
          </label>
          <select
            v-model="formData.vehiculo_id"
            required
            :disabled="noTieneVehiculos"
            class="mt-1 block w-full rounded-lg border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-700 text-white"
          >
            <option value="">Seleccione un vehículo</option>
            <option v-for="vehiculo in vehiculos" :key="vehiculo.vehiculo_id" :value="vehiculo.vehiculo_id">
              {{ vehiculo.marca }} {{ vehiculo.modelo }} - {{ vehiculo.placa }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-200 mb-1">
            Servicio
          </label>
          <select
            v-model="formData.servicio_id"
            required
            :disabled="noTieneVehiculos"
            class="mt-1 block w-full rounded-lg border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-700 text-white"
          >
            <option value="">Seleccione un servicio</option>
            <option v-for="servicio in servicios" :key="servicio.servicio_id" :value="servicio.servicio_id">
              {{ servicio.nombre }} - ${{ servicio.precio_estimado }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-200 mb-1">
            Fecha
          </label>
          <input
            type="date"
            v-model="formData.fecha"
            required
            :min="minDate"
            :disabled="noTieneVehiculos"
            class="mt-1 block w-full rounded-lg border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-700 text-white"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-200 mb-1">
            Hora
          </label>
          <input
            type="time"
            v-model="formData.hora"
            required
            min="08:00"
            max="17:00"
            :disabled="noTieneVehiculos"
            class="mt-1 block w-full rounded-lg border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-700 text-white"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-200 mb-1">
            Descripción
          </label>
          <textarea
            v-model="formData.descripcion"
            rows="3"
            :disabled="noTieneVehiculos"
            class="mt-1 block w-full rounded-lg border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-700 text-white"
            placeholder="Describa el problema o necesidad específica"
          />
        </div>
        <div v-if="noTieneVehiculos" class="text-red-400 mt-2 text-center">
          Debes registrar un vehículo antes de agendar una cita.
        </div>
        <div class="pt-2">
          <button
            type="submit"
            :disabled="noTieneVehiculos"
            class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
          >
            <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10m-9 4h6m-7 5h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z"/>
            </svg>
            Agendar Cita
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { getServicios } from '../services/servicioService'
import { getVehiculos } from '../services/vehiculoService'

export default {
  name: 'AgendarCita',
  data() {
    return {
      vehiculos: [],
      servicios: [],
      formData: {
        vehiculo_id: '',
        servicio_id: '',
        fecha: '',
        hora: '',
        descripcion: ''
      },
      error: '',
      success: '',
      minDate: new Date().toISOString().split('T')[0]
    }
  },
  computed: {
    noTieneVehiculos() {
      return this.vehiculos.length === 0;
    }
  },
  async created() {
    await this.cargarVehiculos()
    await this.cargarServicios()
  },
  methods: {
    async cargarVehiculos() {
      try {
        const token = localStorage.getItem('auth_token')
        if (!token) {
          this.error = 'No hay sesión activa'
          return
        }
        this.vehiculos = await getVehiculos(token)
      } catch (error) {
        console.error('Error al cargar vehículos:', error)
        this.error = 'Error al cargar los vehículos'
      }
    },
    async cargarServicios() {
      try {
        this.servicios = await getServicios();
      } catch (error) {
        console.error('Error al cargar servicios:', error)
        this.error = 'Error al cargar los servicios'
      }
    },
    async handleSubmit() {
      this.error = ''
      this.success = ''

      try {
        const servicioSeleccionado = this.servicios.find(s => s.servicio_id == this.formData.servicio_id);
        const citaData = {
          vehiculo_id: parseInt(this.formData.vehiculo_id),
          tipo_servicio: servicioSeleccionado ? servicioSeleccionado.nombre : '',
          fecha: `${this.formData.fecha}T${this.formData.hora}:00`,
          descripcion: this.formData.descripcion
        }

        const token = localStorage.getItem('auth_token')
        await axios.post(
          'https://toyotaback.onrender.com/api/citas',
          citaData,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        this.success = 'Cita agendada exitosamente'
        
        // Limpiar formulario
        this.formData = {
          vehiculo_id: '',
          servicio_id: '',
          fecha: '',
          hora: '',
          descripcion: ''
        }

        // Redirigir después de 2 segundos
        setTimeout(() => {
          this.$router.push('/mis-citas')
        }, 2000)

      } catch (error) {
        console.error('Error al agendar cita:', error)
        this.error = error.response?.data?.error || 'Error al agendar la cita'
      }
    }
  }
}
</script>

<style scoped>
/* Los estilos de Tailwind se aplican automáticamente */
</style> 