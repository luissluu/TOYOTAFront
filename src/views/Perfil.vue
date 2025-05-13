<template>
  <div class="flex flex-col w-full px-6">
    <section class="grid grid-cols-1 gap-8 px-8 md:grid-cols-2">
      <div class="bg-gray-800 md:col-span-2">
        <div class="mx-auto max-w-2xl px-4 py-1 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-8">
          <h2 class="text-2xl font-bold tracking-tight text-white">Mi Perfil</h2>
          
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
                          <p class="text-white">{{ usuario.fechaNacimiento ? formatearFecha(usuario.fechaNacimiento) : 'No especificada' }}</p>
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
                    <div v-if="!usuario.actividad || usuario.actividad.length === 0" class="text-gray-400 text-center py-4">
                      No hay actividad reciente para mostrar
                    </div>
                    <div
                      v-else
                      v-for="(actividad, index) in usuario.actividad"
                      :key="index"
                      class="flex items-center bg-gray-800 p-4 rounded-lg shadow transition hover:bg-gray-600"
                    >
                      <!-- Icono según tipo -->
                      <div class="mr-4">
                        <span v-if="actividad.tipo && actividad.tipo.toLowerCase().includes('aceite')" class="text-yellow-400 text-2xl">🛢️</span>
                        <span v-else-if="actividad.tipo && actividad.tipo.toLowerCase().includes('filtro')" class="text-green-400 text-2xl">🛠️</span>
                        <span v-else-if="actividad.tipo && actividad.tipo.toLowerCase().includes('alineación')" class="text-blue-400 text-2xl">🚗</span>
                        <span v-else class="text-gray-400 text-2xl">🔧</span>
                      </div>
                      <!-- Detalles -->
                      <div class="flex-1">
                        <h4 class="text-white font-medium">{{ actividad.tipo }}</h4>
                        <p v-if="actividad.descripcion" class="text-gray-400 text-sm">
                          {{ actividad.descripcion }}
                        </p>
                        <p class="text-gray-400 text-xs mt-1">
                          {{ formatearFecha(actividad.fecha) }}
                        </p>
                      </div>
                      <!-- Estado -->
                      <span
                        :class="{
                          'bg-green-100 text-green-800': actividad.estado === 'Completado',
                          'bg-blue-100 text-blue-800': actividad.estado === 'En proceso',
                          'bg-yellow-100 text-yellow-800': actividad.estado === 'Pendiente'
                        }"
                        class="text-xs font-semibold px-2.5 py-0.5 rounded-sm ml-4"
                      >
                        {{ actividad.estado }}
                      </span>
                    </div>
                  </div>
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

const authStore = useAuthStore();
const usuario = ref(null);
const cargando = ref(true);
const error = ref(null);

const cargarDatosUsuario = async () => {
  try {
    cargando.value = true;
    error.value = null;
    usuario.value = await authStore.fetchUser();
  } catch (err) {
    error.value = err.message || 'Error al cargar los datos del usuario';
  } finally {
    cargando.value = false;
  }
};

onMounted(async () => {
  console.log('Montando componente Perfil...');
  await cargarDatosUsuario();
  console.log('Usuario recibido:', usuario.value);
});

const formatearFecha = (fecha) => {
  if (!fecha) return '';
  const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(fecha).toLocaleDateString('es-ES', opciones);
};
</script>