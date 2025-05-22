<!-- src/views/admin/AdminPerfil.vue -->
<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-900 py-8 px-4">
    <div class="bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-2xl flex flex-col items-center">
      <!-- Avatar y nombre -->
      <div class="flex flex-col items-center mb-6">
        <div class="relative">
          <img :src="getAvatarUrl(user)" alt="Avatar" class="w-32 h-32 rounded-full border-4 border-blue-700 bg-gray-700 object-cover shadow-lg">
          <button @click="cambiarFoto" class="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 shadow transition" title="Cambiar foto">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536M9 13h3l8-8a2.828 2.828 0 10-4-4l-8 8v3zm-2 6h12a2 2 0 002-2v-7a2 2 0 00-2-2h-2.586a1 1 0 01-.707-.293l-2.414-2.414a1 1 0 00-1.414 0l-7.293 7.293a1 1 0 000 1.414l2.414 2.414a1 1 0 01.293.707V17a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
        <div class="mt-4 text-center">
          <h2 class="text-2xl font-bold text-white flex items-center justify-center gap-2">
            {{ user?.nombre }} {{ user?.apellidoPaterno }}
            <span class="ml-2 px-2 py-0.5 text-xs font-semibold rounded bg-blue-700 text-white">Administrador</span>
          </h2>
          <p class="text-gray-400 text-sm mt-1">{{ user?.correoElectronico }}</p>
        </div>
      </div>
      <!-- Datos del perfil -->
      <form class="w-full mt-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">Nombre</label>
            <div class="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-4 py-2">{{ perfil.nombre }}</div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">Apellido Paterno</label>
            <div class="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-4 py-2">{{ perfil.apellidoPaterno }}</div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">Apellido Materno</label>
            <div class="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-4 py-2">{{ perfil.apellidoMaterno }}</div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">Correo electrónico</label>
            <div class="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-4 py-2">{{ perfil.correoElectronico }}</div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">Teléfono</label>
            <div class="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-4 py-2">{{ perfil.telefono }}</div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../../components/stores/auth';

export default {
  name: 'AdminPerfil',
  setup() {
    const authStore = useAuthStore();
    const user = authStore.user;
    const perfil = ref({
      nombre: user?.nombre || '',
      apellidoPaterno: user?.apellidoPaterno || '',
      apellidoMaterno: user?.apellidoMaterno || '',
      correoElectronico: user?.correoElectronico || '',
      telefono: user?.telefono || ''
    });

    onMounted(async () => {
      const updatedUser = await authStore.fetchUser();
      perfil.value = {
        nombre: updatedUser?.nombre || '',
        apellidoPaterno: updatedUser?.apellidoPaterno || '',
        apellidoMaterno: updatedUser?.apellidoMaterno || '',
        correoElectronico: updatedUser?.correoElectronico || '',
        telefono: updatedUser?.telefono || ''
      };
    });

    const cambiarFoto = () => {
      // Implementar lógica para cambiar foto
      alert('Funcionalidad para cambiar foto próximamente.');
    };

    const guardarPerfil = () => {
      // Implementar guardado de perfil
      alert('Perfil guardado (simulado): ' + JSON.stringify(perfil.value));
    };

    const restaurarPerfil = () => {
      // Restaurar datos originales del usuario autenticado
      perfil.value = {
        nombre: user?.nombre || '',
        apellidoPaterno: user?.apellidoPaterno || '',
        apellidoMaterno: user?.apellidoMaterno || '',
        correoElectronico: user?.correoElectronico || '',
        telefono: user?.telefono || ''
      };
    };

    // Función para obtener el avatar igual que en el layout
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

    return {
      user,
      perfil,
      cambiarFoto,
      guardarPerfil,
      restaurarPerfil,
      getAvatarUrl
    };
  }
};
</script> 