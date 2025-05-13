<template>
  <div class="flex flex-col w-full px-6">
    <section class="grid grid-cols-1 gap-8 px-8 md:grid-cols-2">
      <div class="bg-gray-800 md:col-span-2">
        <div class="mx-auto max-w-2xl px-4 py-1 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-8">
          <h2 class="text-2xl font-bold tracking-tight text-white">Mi Perfil</h2>
          
          <div class="mt-6 text-white">
            <!-- Estado de carga -->
            <div v-if="cargando" class="text-center py-8">
              <div class="flex justify-center">
                <svg class="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <p class="mt-4 text-gray-400">Cargando información del perfil...</p>
            </div>

            <!-- Mensaje de error -->
            <div v-else-if="error" class="text-center py-8">
              <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong class="font-bold">Error: </strong>
                <span class="block sm:inline">{{ error }}</span>
              </div>
            </div>

            <!-- Información del perfil -->
            <div v-else-if="usuario" class="mt-8">
              <div class="mb-8">
                <div class="bg-gray-700 rounded-lg p-6">
                  <div class="flex flex-col md:flex-row md:items-center">
                    <!-- Datos del perfil -->
                    <div class="flex-grow">
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 class="text-sm font-medium text-gray-400">Nombre</h3>
                          <p class="text-white">{{ usuario.nombre }} {{ usuario.apellido }}</p>
                        </div>
                        <div>
                          <h3 class="text-sm font-medium text-gray-400">Correo Electrónico</h3>
                          <p class="text-white">{{ usuario.email }}</p>
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
              
              <!-- Historial de actividad -->
              <div class="mb-8">
                <h3 class="text-xl font-semibold text-white border-b border-gray-600 pb-2 mb-4">Actividad reciente</h3>
                <div class="bg-gray-700 rounded-lg p-6">
                  <div class="space-y-4">
                    <div v-if="!usuario.actividad || usuario.actividad.length === 0" class="text-gray-400 text-center py-4">
                      No hay actividad reciente para mostrar
                    </div>
                    <div v-else v-for="(actividad, index) in usuario.actividad" :key="index" class="bg-gray-800 p-4 rounded-lg">
                      <div class="flex justify-between items-center">
                        <div>
                          <h4 class="text-white font-medium">{{ actividad.tipo }}</h4>
                          <p class="text-gray-400 text-sm">{{ actividad.estado }} - {{ formatearFecha(actividad.fecha) }}</p>
                        </div>
                        <span :class="{
                          'bg-green-100 text-green-800': actividad.estado === 'Completado',
                          'bg-blue-100 text-blue-800': actividad.estado === 'En proceso',
                          'bg-yellow-100 text-yellow-800': actividad.estado === 'Pendiente'
                        }" class="text-xs font-semibold px-2.5 py-0.5 rounded-sm">{{ actividad.estado }}</span>
                      </div>
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

<script>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../components/stores/auth';

export default {
  name: 'PerfilPage',
  setup() {
    const authStore = useAuthStore();
    const usuario = ref(null);
    const cargando = ref(true);
    const error = ref(null);
    
    const cargarDatosUsuario = async () => {
      try {
        cargando.value = true;
        error.value = null;
        // Obtener datos actualizados del usuario
        const datosUsuario = await authStore.fetchUser();
        usuario.value = datosUsuario;
      } catch (err) {
        error.value = err.message || 'Error al cargar los datos del usuario';
        console.error('Error al cargar datos del usuario:', err);
      } finally {
        cargando.value = false;
      }
    };
    
    onMounted(async () => {
      await cargarDatosUsuario();
    });
    
    // Función para formatear la fecha
    const formatearFecha = (fecha) => {
      if (!fecha) return '';
      
      const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(fecha).toLocaleDateString('es-ES', opciones);
    };
    
    return {
      usuario,
      cargando,
      error,
      formatearFecha
    };
  }
};
</script>