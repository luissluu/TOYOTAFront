<template>
  <div class="min-h-screen bg-gray-900 flex flex-col justify-center items-center py-12">
    <div class="bg-gray-800 rounded-3xl shadow-2xl p-8 w-full max-w-2xl flex flex-col items-center border-2 border-blue-500">
      <h2 class="text-3xl font-extrabold text-white mb-6 text-center">Crear Orden de Servicio</h2>
      <form @submit.prevent="handleSubmit" class="space-y-6 w-full">
        <div>
          <label class="block text-sm font-medium text-gray-200 mb-1">Cita (opcional)</label>
          <select v-model="form.cita_id" class="w-full rounded-lg bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500">
            <option value="">Sin cita</option>
            <option v-for="cita in citas" :key="cita.cita_id" :value="cita.cita_id">
              {{ cita.tipo_servicio }} - {{ formatearFecha(cita.fecha) }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-200 mb-1">Cliente</label>
          <select v-model="form.usuario_id" @change="cargarVehiculosCliente" required class="w-full rounded-lg bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500">
            <option value="">Seleccione un cliente</option>
            <option v-for="usuario in usuarios" :key="usuario.usuario_id" :value="usuario.usuario_id">
              {{ usuario.nombre }} {{ usuario.apellidoPaterno }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-200 mb-1">Vehículo</label>
          <select v-model="form.vehiculo_id" required class="w-full rounded-lg bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500">
            <option value="">Seleccione un vehículo</option>
            <option v-for="vehiculo in vehiculosCliente" :key="vehiculo.vehiculo_id" :value="vehiculo.vehiculo_id">
              {{ vehiculo.marca }} {{ vehiculo.modelo }} - {{ vehiculo.placa }}
            </option>
          </select>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-200 mb-1">Fecha de inicio</label>
            <input type="datetime-local" v-model="form.fecha_inicio" class="w-full rounded-lg bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-200 mb-1">Fecha de finalización</label>
            <input type="datetime-local" v-model="form.fecha_finalizacion" class="w-full rounded-lg bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500" />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-200 mb-1">Estado</label>
          <select v-model="form.estado" class="w-full rounded-lg bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500">
            <option value="abierta">Abierta</option>
            <option value="en proceso">En proceso</option>
            <option value="finalizada">Finalizada</option>
            <option value="cancelada">Cancelada</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-200 mb-1">Diagnóstico</label>
          <textarea v-model="form.diagnostico" rows="2" class="w-full rounded-lg bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500" placeholder="Describe el diagnóstico..."></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-200 mb-1">Notas</label>
          <textarea v-model="form.notas" rows="2" class="w-full rounded-lg bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500" placeholder="Notas adicionales..."></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-200 mb-1">Total</label>
          <input type="number" v-model="form.total" min="0" step="0.01" class="w-full rounded-lg bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500" />
        </div>
        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-2 w-full text-center">
          {{ error }}
        </div>
        <div v-if="success" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-2 w-full text-center">
          {{ success }}
        </div>
        <div class="pt-2">
          <button type="submit" class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition">
            Crear Orden
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from '../../axios';
import { useAuthStore } from '../../components/stores/auth';

const authStore = useAuthStore();
const form = ref({
  cita_id: '',
  usuario_id: '',
  vehiculo_id: '',
  fecha_inicio: '',
  fecha_finalizacion: '',
  estado: 'abierta',
  diagnostico: '',
  notas: '',
  total: 0
});
const error = ref('');
const success = ref('');
const usuarios = ref([]);
const vehiculosCliente = ref([]);
const citas = ref([]);

const cargarUsuarios = async () => {
  const token = localStorage.getItem('auth_token');
  const { data } = await axios.get('/api/usuarios', { headers: { Authorization: `Bearer ${token}` } });
  usuarios.value = data;
};

const cargarCitas = async () => {
  const token = localStorage.getItem('auth_token');
  const { data } = await axios.get('/api/citas', { headers: { Authorization: `Bearer ${token}` } });
  citas.value = data;
};

const cargarVehiculosCliente = async () => {
  vehiculosCliente.value = [];
  if (!form.value.usuario_id) return;
  const token = localStorage.getItem('auth_token');
  const { data } = await axios.get('/api/vehiculos', { headers: { Authorization: `Bearer ${token}` } });
  vehiculosCliente.value = data.filter(v => v.usuario_id == form.value.usuario_id);
};

const formatearFecha = (fecha) => {
  if (!fecha) return '';
  try {
    const opciones = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const fechaObj = new Date(fecha);
    if (isNaN(fechaObj.getTime())) return 'Fecha inválida';
    return fechaObj.toLocaleDateString('es-ES', opciones) + ' ' + fechaObj.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  } catch (error) {
    return fecha;
  }
};

onMounted(async () => {
  await cargarUsuarios();
  await cargarCitas();
});

const handleSubmit = async () => {
  error.value = '';
  success.value = '';
  try {
    const token = localStorage.getItem('auth_token');
    const payload = {
      ...form.value,
      creado_por: authStore.user.usuario_id
    };
    await axios.post('/api/ordenes', payload, { headers: { Authorization: `Bearer ${token}` } });
    success.value = 'Orden creada exitosamente';
    // Limpiar formulario
    form.value = {
      cita_id: '', usuario_id: '', vehiculo_id: '', fecha_inicio: '', fecha_finalizacion: '', estado: 'abierta', diagnostico: '', notas: '', total: 0
    };
  } catch (err) {
    error.value = err.response?.data?.error || 'Error al crear la orden';
  }
};
</script>

<style scoped>
/* Los estilos de Tailwind se aplican automáticamente */
</style> 