<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12">
    <div class="container mx-auto px-4">
      <!-- Encabezado -->
      <div class="mb-8 text-center">
        <h2 class="text-4xl font-bold text-white mb-2">Crear Orden de Servicio</h2>
        <p class="text-gray-400">Complete los detalles para crear una nueva orden de servicio</p>
      </div>

      <div class="max-w-4xl mx-auto">
        <form @submit.prevent="crearOrden" class="space-y-8">
          <!-- Sección de Información Principal -->
          <div class="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700 transform transition-all duration-500"
               :class="{'scale-100 opacity-100': true, 'scale-95 opacity-50': !form.usuario_id || !form.vehiculo_id}">
            <h3 class="text-xl font-semibold text-white mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Información Principal
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Selección de Usuario -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-300">Usuario</label>
                <select v-model="form.usuario_id" required
                  class="w-full rounded-lg bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500 transition duration-200">
                  <option value="">Seleccionar usuario</option>
                  <option v-for="usuario in usuarios" :key="usuario.usuario_id" :value="usuario.usuario_id">
                    {{ usuario.nombre }} {{ usuario.apellidoPaterno }}
                  </option>
                </select>
              </div>

              <!-- Selección de Vehículo -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-300">Vehículo</label>
                <select v-model="form.vehiculo_id" required :disabled="!form.usuario_id"
                  class="w-full rounded-lg bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 transition duration-200">
                  <option value="">Seleccionar vehículo</option>
                  <option v-for="vehiculo in vehiculosFiltrados" :key="vehiculo.vehiculo_id" :value="vehiculo.vehiculo_id">
                    {{ vehiculo.marca }} {{ vehiculo.modelo }} - {{ vehiculo.placa }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <!-- Sección de Detalles de la Orden -->
          <transition
            enter-active-class="transition duration-500 ease-out"
            enter-from-class="transform -translate-y-4 opacity-0"
            enter-to-class="transform translate-y-0 opacity-100"
            leave-active-class="transition duration-300 ease-in"
            leave-from-class="transform translate-y-0 opacity-100"
            leave-to-class="transform -translate-y-4 opacity-0"
          >
            <div v-if="form.usuario_id && form.vehiculo_id"
                 class="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700">
              <h3 class="text-xl font-semibold text-white mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Detalles de la Orden
              </h3>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Cita -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-300">Cita (opcional)</label>
                  <select v-model="form.cita_id" :disabled="!form.usuario_id"
                    class="w-full rounded-lg bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 transition duration-200">
                    <option value="">Sin cita</option>
                    <option v-for="cita in citasFiltradas" :key="cita.cita_id" :value="cita.cita_id">
                      {{ cita.tipo_servicio }} - {{ formatearFecha(cita.fecha) }}
                    </option>
                  </select>
                </div>

                <!-- Fecha de Inicio -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-300">Fecha de Inicio</label>
                  <input type="datetime-local" v-model="form.fecha_inicio" required
                    class="w-full rounded-lg bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500 transition duration-200">
                </div>
              </div>

              <!-- Diagnóstico -->
              <div class="mt-6 space-y-2">
                <label class="block text-sm font-medium text-gray-300">Diagnóstico</label>
                <textarea v-model="form.diagnostico" rows="3" required
                  class="w-full rounded-lg bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500 transition duration-200"
                  placeholder="Describe el diagnóstico inicial..."></textarea>
              </div>

              <!-- Notas -->
              <div class="mt-6 space-y-2">
                <label class="block text-sm font-medium text-gray-300">Notas Adicionales</label>
                <textarea v-model="form.notas" rows="3"
                  class="w-full rounded-lg bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500 transition duration-200"
                  placeholder="Agrega notas adicionales..."></textarea>
              </div>
            </div>
          </transition>

          <!-- Sección de Servicios -->
          <transition
            enter-active-class="transition duration-500 ease-out"
            enter-from-class="transform -translate-y-4 opacity-0"
            enter-to-class="transform translate-y-0 opacity-100"
            leave-active-class="transition duration-300 ease-in"
            leave-from-class="transform translate-y-0 opacity-100"
            leave-to-class="transform -translate-y-4 opacity-0"
          >
            <div v-if="form.diagnostico"
                 class="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700">
              <h3 class="text-xl font-semibold text-white mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  <div v-for="(servicio, index) in serviciosSeleccionados" :key="index" 
                    class="bg-gray-700 rounded-lg p-4 flex flex-col md:flex-row gap-4 items-start">
                    <div class="flex-1 space-y-4">
                      <div class="space-y-2">
                        <label class="block text-sm font-medium text-gray-300">Servicio</label>
                        <select v-model="servicio.id" required
                          class="w-full rounded-lg bg-gray-600 text-white border-gray-500 focus:border-blue-500 focus:ring-blue-500 transition duration-200">
                          <option value="">Seleccionar servicio</option>
                          <option v-for="s in servicios" :key="s.servicio_id" :value="s.servicio_id">
                            {{ s.nombre }} - ${{ s.precio_estimado }}
                          </option>
                        </select>
                      </div>
                      <div class="space-y-2">
                        <label class="block text-sm font-medium text-gray-300">Mecánico Asignado</label>
                        <select v-model="servicio.mecanico_id" required
                          class="w-full rounded-lg bg-gray-600 text-white border-gray-500 focus:border-blue-500 focus:ring-blue-500 transition duration-200">
                          <option value="">Seleccionar mecánico</option>
                          <option v-for="m in mecanicos" :key="m.usuario_id" :value="m.usuario_id">
                            {{ m.nombre }} {{ m.apellidoPaterno }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <button type="button" @click="eliminarServicio(index)"
                      class="p-2 text-red-500 hover:text-red-600 transition duration-200">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </transition-group>

                <button type="button" @click="agregarServicio"
                  class="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200 flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                  </svg>
                  Agregar Servicio
                </button>
              </div>
            </div>
          </transition>

          <!-- Resumen y Botones -->
          <transition
            enter-active-class="transition duration-500 ease-out"
            enter-from-class="transform -translate-y-4 opacity-0"
            enter-to-class="transform translate-y-0 opacity-100"
            leave-active-class="transition duration-300 ease-in"
            leave-from-class="transform translate-y-0 opacity-100"
            leave-to-class="transform -translate-y-4 opacity-0"
          >
            <div v-if="serviciosSeleccionados.some(s => s.id && s.mecanico_id)"
                 class="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700">
              <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                <div class="text-right">
                  <p class="text-gray-400">Total Estimado</p>
                  <p class="text-3xl font-bold text-white">${{ calcularTotal() }}</p>
                </div>
                <div class="flex gap-4">
                  <button type="button" @click="$router.push('/admin')"
                    class="px-6 py-3 text-sm font-medium text-gray-300 hover:text-white transition duration-200">
                    Cancelar
                  </button>
                  <button type="submit"
                    class="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-200">
                    Crear Orden
                  </button>
                </div>
              </div>
            </div>
          </transition>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue'
import axios from 'axios'
import { useAuthStore } from '../../components/stores/auth'
import { useRouter } from 'vue-router'

export default {
  name: 'AdminCrearOrden',
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()
    const usuarios = ref([])
    const vehiculos = ref([])
    const citas = ref([])
    const servicios = ref([])
    const mecanicos = ref([])
    const serviciosSeleccionados = ref([{ id: '', mecanico_id: '' }])

    const form = ref({
      usuario_id: '',
      vehiculo_id: '',
      cita_id: '',
      fecha_inicio: '',
      estado: 'abierta',
      diagnostico: '',
      notas: '',
      total: 0
    })

    // Computed para filtrar vehículos y citas según usuario seleccionado
    const vehiculosFiltrados = computed(() => {
      if (!form.value.usuario_id) return []
      return vehiculos.value.filter(v => v.usuario_id === form.value.usuario_id)
    })
    const citasFiltradas = computed(() => {
      if (!form.value.usuario_id) return []
      return citas.value.filter(c => c.usuario_id === form.value.usuario_id)
    })

    // Limpiar selects dependientes si cambia usuario
    watch(() => form.value.usuario_id, () => {
      form.value.vehiculo_id = ''
      form.value.cita_id = ''
    })

    const cargarUsuarios = async () => {
      try {
        const { data } = await axios.get('/api/usuarios')
        usuarios.value = data
      } catch (error) {
        console.error('Error al cargar usuarios:', error)
      }
    }

    const cargarVehiculos = async () => {
      try {
        const { data } = await axios.get('/api/vehiculos')
        vehiculos.value = data
      } catch (error) {
        console.error('Error al cargar vehículos:', error)
      }
    }

    const cargarCitas = async () => {
      try {
        const { data } = await axios.get('/api/citas?estado=programada')
        citas.value = data
      } catch (error) {
        console.error('Error al cargar citas:', error)
      }
    }

    const cargarServicios = async () => {
      try {
        const { data } = await axios.get('/api/servicios')
        servicios.value = data
      } catch (error) {
        console.error('Error al cargar servicios:', error)
      }
    }

    const cargarMecanicos = async () => {
      try {
        const { data } = await axios.get('/api/usuarios?rol=2')
        mecanicos.value = data
      } catch (error) {
        console.error('Error al cargar mecánicos:', error)
      }
    }

    const agregarServicio = () => {
      serviciosSeleccionados.value.push({ id: '', mecanico_id: '' })
    }

    const eliminarServicio = (index) => {
      serviciosSeleccionados.value.splice(index, 1)
    }

    const calcularTotal = () => {
      return serviciosSeleccionados.value.reduce((total, servicio) => {
        const servicioSeleccionado = servicios.value.find(s => s.servicio_id === servicio.id)
        return total + (servicioSeleccionado?.precio_estimado || 0)
      }, 0)
    }

    const formatearFecha = (fecha) => {
      return new Date(fecha).toLocaleString()
    }

    const crearOrden = async () => {
      try {
        const creadoPorId = authStore.user?.id;
        if (!creadoPorId) {
          alert('No se pudo obtener el ID del administrador. Vuelve a iniciar sesión.');
          return;
        }
        const fechaInicio = form.value.fecha_inicio ? new Date(form.value.fecha_inicio).toISOString() : null;
        const ordenData = {
          usuario_id: form.value.usuario_id,
          vehiculo_id: form.value.vehiculo_id,
          cita_id: form.value.cita_id || null,
          fecha_inicio: fechaInicio,
          estado: 'abierta',
          diagnostico: form.value.diagnostico,
          notas: form.value.notas || '',
          total: calcularTotal(),
          servicios: serviciosSeleccionados.value.map(s => ({ id: s.id, mecanico_id: s.mecanico_id })),
          creado_por: creadoPorId
        };
        await axios.post('/api/ordenes-servicio', ordenData);
        alert('Orden creada exitosamente');
        router.push('/admin');
      } catch (error) {
        console.error('Error al crear orden:', error);
        alert(error.response?.data?.error || 'Error al crear la orden');
      }
    }

    onMounted(() => {
      cargarUsuarios()
      cargarVehiculos()
      cargarCitas()
      cargarServicios()
      cargarMecanicos()
    })

    return {
      form,
      usuarios,
      vehiculos,
      citas,
      servicios,
      mecanicos,
      serviciosSeleccionados,
      agregarServicio,
      eliminarServicio,
      calcularTotal,
      formatearFecha,
      crearOrden,
      vehiculosFiltrados,
      citasFiltradas
    }
  }
}
</script> 