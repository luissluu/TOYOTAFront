//src/layouts/AdminLayout.vue
<template>
  <div class="relative min-h-screen lg:flex">
    <!-- Barra superior en móvil -->
    <header class="text-gray-100 bg-gray-800 lg:hidden">
      <div class="container flex items-center justify-between p-4 mx-auto">
        <router-link to="/admin" class="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        </router-link>
        
        <button @click="isOpen = !isOpen" class="p-2 text-white rounded-lg focus:outline-none hover:bg-gray-700">
          <svg v-show="!isOpen" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>

          <svg v-show="isOpen" class="w-6 h-6 transition duration-200 ease-in-out" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </header>

    <div v-cloak :class="isOpen ? 'block' : 'hidden'" @click="isOpen = false" class="fixed inset-0 z-20 transition-opacity bg-black opacity-30 lg:hidden"></div>

    <!-- Barra lateral de administrador (diferente a la de usuarios normales) -->
    <aside id="sidebar" :class="isOpen ? 'translate-x-0 ease-in' : '-translate-x-full ease-out'" class="fixed inset-y-0 left-0 z-30 flex flex-col w-[4.5rem] min-h-screen space-y-6 overflow-y-auto text-gray-100 transition duration-200 transform bg-black lg:translate-x-0 lg:relative lg:inset-0">
      <div class="flex flex-col items-center flex-1 space-y-6">
        <router-link to="/admin" class="flex items-center justify-center w-full p-5 lg:p-0 lg:h-20 font-bold text-white truncate bg-red-600 whitespace-nowrap">
          <img src="/Images/Logo.png" alt="Logo" class="w-17 h-17">
        </router-link>

        <nav class="flex flex-col items-center space-y-6">
          <!-- Enlaces de navegación para administrador -->
          <router-link to="/admin" exact class="p-3 transition-colors duration-300 rounded-lg" :class="{ 'bg-white': $route.path === '/admin', 'hover:bg-white': $route.path !== '/admin' }">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" :class="{ 'stroke-blue-700': $route.path === '/admin', 'stroke-gray-100 group-hover:stroke-blue-700': $route.path !== '/admin' }" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </router-link>

          <!-- Enlace a Gestión de Usuarios -->
          <router-link to="/admin/usuarios" class="p-2 transition-colors duration-300 rounded-lg group" :class="{ 'bg-white': $route.path === '/admin/usuarios', 'hover:bg-white': $route.path !== '/admin/usuarios' }">
            <svg class="w-5 h-5" :class="{ 'stroke-blue-700': $route.path === '/admin/usuarios', 'stroke-gray-100 group-hover:stroke-blue-700': $route.path !== '/admin/usuarios' }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </router-link>

          <!-- Enlace a Gestión de Servicios (Inventario de piezas y herramientas) -->
          <router-link to="/admin/servicios" class="p-2 transition-colors duration-300 rounded-lg group" :class="{ 'bg-white': $route.path === '/admin/servicios', 'hover:bg-white': $route.path !== '/admin/servicios' }">
            <svg class="w-5 h-5 transition-colors duration-300" :class="{ 'text-blue-500': $route.path === '/admin/servicios', 'text-gray-400 group-hover:text-blue-500': $route.path !== '/admin/servicios' }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M0 4.6A2.6 2.6 0 0 1 2.6 2h18.8A2.6 2.6 0 0 1 24 4.6v.8A2.6 2.6 0 0 1 21.4 8H21v10.6c0 1.33-1.07 2.4-2.4 2.4H5.4C4.07 21 3 19.93 3 18.6V8h-.4A2.6 2.6 0 0 1 0 5.4v-.8ZM2.6 4a.6.6 0 0 0-.6.6v.8a.6.6 0 0 0 .6.6h18.8a.6.6 0 0 0 .6-.6v-.8a.6.6 0 0 0-.6-.6H2.6ZM8 10a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8Z" fill="currentColor"></path>
            </svg>
          </router-link>
          <router-link to="/admin/crear-orden" class="p-2 transition-colors duration-300 rounded-lg group" :class="{ 'bg-white': $route.path === '/admin/crear-orden', 'hover:bg-white': $route.path !== '/admin/crear-orden' }">
            <svg class="w-5 h-5" :class="{ 'stroke-blue-700': $route.path === '/admin/crear-orden', 'stroke-gray-100 group-hover:stroke-blue-700': $route.path !== '/admin/crear-orden' }" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </router-link>

          <!-- Enlace a Reportes y Estadísticas -->
          <router-link to="/admin/reportes" class="p-2 transition-colors duration-300 rounded-lg group" :class="{ 'bg-white': $route.path === '/admin/reportes', 'hover:bg-white': $route.path !== '/admin/reportes' }">
            <svg class="w-5 h-5" :class="{ 'stroke-blue-700': $route.path === '/admin/reportes', 'stroke-gray-100 group-hover:stroke-blue-700': $route.path !== '/admin/reportes' }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </router-link>

          <!-- Enlace a Órdenes de Servicio -->
          <router-link to="/admin/ordenes" class="p-2 transition-colors duration-300 rounded-lg group" :class="{ 'bg-white': $route.path.startsWith('/admin/ordenes'), 'hover:bg-white': !$route.path.startsWith('/admin/ordenes') }">
            <svg class="w-5 h-5 transition-colors duration-300" :class="{ 'text-blue-500': $route.path.startsWith('/admin/ordenes'), 'text-gray-400 group-hover:text-blue-500': !$route.path.startsWith('/admin/ordenes') }" viewBox="0 0 1024 1024" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M300 462.4h424.8v48H300v-48zM300 673.6H560v48H300v-48z" />
              <path d="M818.4 981.6H205.6c-12.8 0-24.8-2.4-36.8-7.2-11.2-4.8-21.6-11.2-29.6-20-8.8-8.8-15.2-20-29.6-4.8-12-7.2-24-7.2-36.8V250.4c0-12.8 2.4-24.8 7.2-36.8 4.8-11.2 11.2-21.6 20-29.6 8.8-8.8 18.4-15.2 20-29.6 4.8-12 7.2-24 7.2-36.8V250.4c0-12.8 2.4-24.8 7.2-36.8 4.8-11.2 11.2-21.6 20-29.6 8.8-8.8 18.4-15.2 20-29.6 4.8-12 7.2-24 7.2-36.8v637.6c0 12.8-2.4 24.8-7.2 36.8-4.8 11.2-11.2 21.6-20 29.6-8.8 8.8-18.4 15.2-29.6 20-12 5.6-24 8-36.8 8z" />
              <path d="M747.2 297.6H276.8V144c0-32.8 26.4-59.2 59.2-59.2h60.8c21.6-43.2 66.4-71.2 116-71.2 49.6 0 94.4 28 116 71.2h60.8c32.8 0 59.2 26.4 59.2 59.2l-1.6 153.6z m-423.2-47.2h376.8V144c0-6.4-5.6-12-12-12H595.2l-5.6-16c-11.2-32.8-42.4-55.2-77.6-55.2-35.2 0-66.4 22.4-77.6 55.2l-5.6 16H335.2c-6.4 0-12 5.6-12 12v106.4z" />
            </svg>
          </router-link>
        </nav>
      </div>

      <div class="flex justify-center py-5 border-t border-gray-600">
        <!-- Enlace a Configuración de administrador -->
        <router-link to="/admin/configuracion" class="p-2 transition-colors duration-300 rounded-lg group" :class="{ 'bg-white': $route.path === '/admin/configuracion', 'hover:bg-white': $route.path !== '/admin/configuracion' }">
          <svg class="w-5 h-5" :class="{ 'stroke-blue-700': $route.path === '/admin/configuracion', 'stroke-gray-100 group-hover:stroke-blue-700': $route.path !== '/admin/configuracion' }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" stroke-width="2" />
            <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15V15Z" stroke="currentColor" stroke-width="2" />
          </svg>
        </router-link>
      </div>
    </aside>

    <!-- Contenido principal con barra superior -->
    <main id="content" class="flex-1 pb-12 space-y-6 overflow-y-auto bg-gray-800 lg:h-screen md:space-y-8">
      <header class="flex items-center justify-between h-20 px-6 bg-gray-800 border-b border-gray-700/50">
        <div></div>
        <div class="flex items-center gap-6">
          <!-- Menú de usuario con avatar y nombre/apellido -->
          <div class="relative">
            <button class="flex items-center gap-2 transition-colors duration-300 rounded-lg sm:px-4 sm:py-2 focus:outline-none hover:bg-gray-100" @click="dropdownOpen = !dropdownOpen">
              <img
                v-if="authStore.user"
                :src="getAvatarUrl(authStore.user)"
                alt="Avatar"
                class="w-10 h-10 rounded-full border-2 border-gray-700 bg-gray-900 object-cover shadow"
              />
              <div class="flex flex-col justify-center text-left">
                <span class="font-semibold text-sm text-gray-300 leading-tight">{{ authStore.user?.nombre }}</span>
                <span class="text-sm text-gray-300 leading-tight">{{ authStore.user?.apellidoPaterno }}</span>
                <span class="inline-block mt-1 px-2 py-0.5 text-xs font-semibold rounded bg-blue-700 text-white w-fit">Administrador</span>
              </div>
            </button>
            <transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <div class="absolute right-0 z-50 w-56 p-2 bg-white border rounded-lg top-16 lg:top-20" v-show="dropdownOpen">
                <router-link to="/admin/perfil" class="block px-4 py-2 text-gray-800 transition-colors duration-300 rounded-lg cursor-pointer hover:bg-gray-100">Perfil de Administrador</router-link>
                <router-link to="/admin/cambiar-contrasena" class="block px-4 py-2 text-gray-800 transition-colors duration-300 rounded-lg cursor-pointer hover:bg-gray-100">Restablecer Contraseña</router-link>
              </div>
            </transition>
          </div>
          <div v-show="dropdownOpen" class="fixed inset-0 z-30" @click="dropdownOpen = false"></div>
          <!-- Botón de cerrar sesión -->
          <button 
            @click="cerrarSesion" 
            class="p-2 text-gray-400 transition-colors duration-300 rounded-full focus:outline-none hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100"
          >
            <span class="sr-only">Cerrar sesión</span>
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </header>

      <!-- Aquí se renderizará el contenido de cada página -->
      <router-view>
          
      </router-view>
    </main>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../components/stores/auth';

export default {
  name: 'AdminLayout',
  setup() {
    const isOpen = ref(false);
    const dropdownOpen = ref(false);
    const router = useRouter();
    const authStore = useAuthStore();

    const cerrarSesion = () => {
      // Limpiar datos de autenticación
      authStore.logout();
      // Redirigir al login
      router.push('/login');
    };

    // Función para obtener el avatar igual que en App.vue
    const getAvatarUrl = (usuario) => {
      if (usuario?.foto) {
        return usuario.foto;
      }
      const nombre = usuario?.nombre || '';
      const apellido = usuario?.apellidoPaterno || '';
      const apellidos = apellido + ' ' + (usuario?.apellidoMaterno || '');
      const fullName = encodeURIComponent((nombre + ' ' + apellidos).trim());
      return `https://ui-avatars.com/api/?name=${fullName}&background=random&color=fff&size=64`;
    };

    return {
      isOpen,
      dropdownOpen,
      cerrarSesion,
      authStore,
      getAvatarUrl
    };
  }
}
</script>