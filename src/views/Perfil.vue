<template>
  <div class="flex flex-col w-full px-6">
    <section class="grid grid-cols-1 gap-8 px-8 md:grid-cols-2">
      <div class="bg-gray-800 md:col-span-2">
        <div class="mx-auto max-w-2xl px-4 py-1 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-8">
          <h2 class="text-2xl font-bold tracking-tight text-white">Mi Perfil</h2>
          <div class="flex items-center gap-6 mt-8 mb-8">
            <img
              v-if="usuario"
              :src="getAvatarUrl(usuario)"
              alt="Avatar"
              class="w-28 h-28 rounded-full border-4 border-gray-700 bg-gray-900 object-cover shadow-lg"
            />
            <div>
              <h3 class="text-2xl font-semibold text-white leading-tight">{{ usuario?.nombre }} {{ usuario?.apellidoPaterno }} {{ usuario?.apellidoMaterno }}</h3>
              <p class="text-gray-400">{{ usuario?.correoElectronico }}</p>
            </div>
          </div>
          
          <div class="mt-6 text-white">
            <div v-if="cargando" class="text-center py-8">
              <span class="text-gray-400">Cargando información del perfil...</span>
            </div>
            <div v-else-if="error" class="text-center py-8">
              <span class="text-red-500">{{ error }}</span>
            </div>
            <div v-else-if="usuario" class="mt-8">
              <div class="mb-8">
                <div class="bg-gray-700 rounded-lg p-6">
                  <div class="flex flex-col md:flex-row md:items-center">
                    <!-- Datos del perfil (solo visualización) -->
                    <div class="flex-grow">
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 class="text-sm font-medium text-gray-400">Nombre</h3>
                          <p class="text-white">{{ usuario.nombre }} {{ usuario.apellidoPaterno }} {{ usuario.apellidoMaterno }}</p>
                        </div>
                        <div>
                          <h3 class="text-sm font-medium text-gray-400">Correo Electrónico</h3>
                          <p class="text-white">{{ usuario.correoElectronico }}</p>
                        </div>
                        <div>
                          <h3 class="text-sm font-medium text-gray-400">Teléfono</h3>
                          <p class="text-white">{{ usuario.telefono || 'No especificado' }}</p>
                        </div>
                        <div>
                          <h3 class="text-sm font-medium text-gray-400">Fecha de Nacimiento</h3>
                          <p class="text-white">{{ usuario.fecha_nacimiento ? formatearFecha(usuario.fecha_nacimiento) : 'No especificada' }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Historial de actividad personalizado -->
              <div class="mb-8">
                <h3 class="text-xl font-semibold text-white border-b border-gray-600 pb-2 mb-4">Actividad reciente</h3>
                <div class="bg-gray-700 rounded-lg p-6">
                  <div class="space-y-4">
                    <div v-if="citas.length === 0" class="text-gray-400 text-center py-4">
                      No hay actividad reciente para mostrar
                    </div>
                    <div
                      v-else
                      v-for="cita in citas"
                      :key="cita.cita_id"
                      class="flex items-center bg-gray-800 p-4 rounded-lg shadow transition hover:bg-gray-600"
                    >
                      <div class="mr-4">
                        <span class="text-blue-400 text-2xl">📅</span>
                      </div>
                      <div class="flex-1">
                        <h4 class="text-white font-medium">{{ cita.tipo_servicio }}</h4>
                        <p class="text-gray-400 text-sm">
                          {{ cita.descripcion }}
                        </p>
                        <p class="text-gray-400 text-xs mt-1">
                          {{ formatearFecha(cita.fecha) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mb-8">
                <h3 class="text-xl font-semibold text-white border-b border-gray-600 pb-2 mb-4">Mis Vehículos</h3>
                <div class="bg-gray-700 rounded-lg p-6">
                  <div v-if="vehiculos.length === 0" class="text-gray-400 text-center py-4">
                    No tienes vehículos registrados
                  </div>
                  <ul v-else>
                    <li v-for="vehiculo in vehiculos" :key="vehiculo.vehiculo_id" class="mb-2">
                      <span class="text-white font-medium">{{ vehiculo.marca }} {{ vehiculo.modelo }} - {{ vehiculo.placa }}</span>
                      <span class="text-gray-400 text-sm ml-2">({{ vehiculo.año }})</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../components/stores/auth';
import axios from '../axios';

const authStore = useAuthStore();
const usuario = ref(null);
const cargando = ref(true);
const error = ref(null);
const citas = ref([]);
const vehiculos = ref([]);

const cargarDatosUsuario = async () => {
  try {
    cargando.value = true;
    error.value = null;
    usuario.value = await authStore.fetchUser();
    // Obtener citas del usuario
    if (usuario.value && usuario.value.usuario_id) {
      const { data } = await axios.get(`/api/citas/usuario/${usuario.value.usuario_id}`);
      citas.value = data;
    }
  } catch (err) {
    error.value = err.message || 'Error al cargar los datos del usuario';
  } finally {
    cargando.value = false;
  }
};

const cargarVehiculos = async () => {
  try {
    const token = localStorage.getItem('auth_token');
    if (token) {
      const { data } = await axios.get('/api/vehiculos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      vehiculos.value = data;
    }
  } catch (err) {
    // Manejo de error opcional
  }
};

onMounted(async () => {
  await cargarDatosUsuario();
  await cargarVehiculos();
});

const formatearFecha = (fecha) => {
  if (!fecha) return '';
  try {
    const opciones = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const fechaObj = new Date(fecha);
    if (isNaN(fechaObj.getTime())) {
      return 'Fecha inválida';
    }
    return fechaObj.toLocaleDateString('es-ES', opciones) + ' ' + fechaObj.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  } catch (error) {
    return fecha;
  }
};

const getAvatarUrl = (usuario) => {
  if (usuario?.foto) {
    return usuario.foto;
  }
  const nombre = usuario?.nombre || '';
  const apellido = usuario?.apellidoPaterno || '';
  const apellidos = apellido + ' ' + (usuario?.apellidoMaterno || '');
  const fullName = encodeURIComponent((nombre + ' ' + apellidos).trim());
  return `https://ui-avatars.com/api/?name=${fullName}&background=random&color=fff&size=128`;
};
</script>