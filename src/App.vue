<template>
  <!-- Diseño de autenticación (login, registro, recuperación) -->
  <div v-if="isAuthRoute" class="min-h-screen w-full">
      <!-- Solo se muestra la vista de autenticación -->
      <router-view></router-view>
  </div>

      <!-- Diseño de administrador -->
      <div v-else-if="isAdminRoute">
      <!-- Mostrar la vista del administrador -->
      <router-view></router-view>
  </div>

  <!-- Diseño principal con barra lateral y superior -->
  <div v-else class="relative min-h-screen lg:flex">
      <!-- Barra superior en móvil -->
      <header class="text-gray-100 bg-gray-800 lg:hidden">
          <div class="container flex items-center justify-between p-4 mx-auto">
              <router-link to="/" class="text-white">
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

      <!-- Barra lateral -->
      <aside id="sidebar" :class="isOpen ? 'translate-x-0 ease-in' : '-translate-x-full ease-out'" class="fixed inset-y-0 left-0 z-30 flex flex-col w-[4.5rem] min-h-screen space-y-6 overflow-y-auto text-gray-100 transition duration-200 transform bg-gradient-to-b from-gray-900 to-black lg:translate-x-0 lg:relative lg:inset-0">
          <div class="flex flex-col items-center flex-1 space-y-6">
              <router-link to="/" class="flex items-center justify-center w-full p-5 lg:p-0 lg:h-20 font-bold text-white truncate bg-red-600 whitespace-nowrap">
                  <img src="/Images/Logo.png" alt="Logo" class="w-17 h-17">
              </router-link>

              <nav class="flex flex-col items-center space-y-6">
                  <!-- Enlace a Home (Inicio) -->
                  <router-link to="/Home" exact class="p-3 transition-all duration-300 rounded-lg group hover:bg-white/10" :class="{ 'bg-white/10': $route.path === '/Home' }">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 transition-colors duration-300" :class="{ 'text-blue-500': $route.path === '/Home', 'text-gray-400 group-hover:text-blue-500': $route.path !== '/Home' }" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                      </svg>
                  </router-link>

                  <!-- Enlace a Servicios Automotrices -->
                  <router-link to="/Servicios" class="p-3 transition-all duration-300 rounded-lg group hover:bg-white/10" :class="{ 'bg-white/10': $route.path === '/Servicios' }">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 transition-colors duration-300" :class="{ 'text-blue-500': $route.path === '/Servicios', 'text-gray-400 group-hover:text-blue-500': $route.path !== '/Servicios' }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 16v-1a4 4 0 014-4h10a4 4 0 014 4v1M5 16v2a2 2 0 002 2h10a2 2 0 002-2v-2M6.5 12l1-2m9 2l-1-2M7 16h10" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
                      </svg>
                  </router-link>

                  <!-- Enlace a Historial de Servicio -->
                  <router-link to="/Historial" class="p-3 transition-all duration-300 rounded-lg group hover:bg-white/10" :class="{ 'bg-white/10': $route.path === '/Historial' }">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 transition-colors duration-300" :class="{ 'text-blue-500': $route.path === '/Historial', 'text-gray-400 group-hover:text-blue-500': $route.path !== '/Historial' }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5h6a2 2 0 012 2v12a2 2 0 01-2 2H9a2 2 0 01-2-2V7a2 2 0 012-2z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 10h6M9 14h6" />
                      </svg>
                  </router-link>

                  <!-- Enlace a Registrar Vehículo -->
                  <router-link to="/configuracion" class="p-3 transition-all duration-300 rounded-lg group hover:bg-white/10" :class="{ 'bg-white/10': $route.path === '/configuracion' }" title="Registrar Vehículo" @click.native="abrirModalVehiculo">
                    <svg class="w-5 h-5 transition-colors duration-300" :class="{ 'text-blue-500': $route.path === '/configuracion', 'text-gray-400 group-hover:text-blue-500': $route.path !== '/configuracion' }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 8L5.72187 10.2682C5.90158 10.418 6.12811 10.5 6.36205 10.5H17.6379C17.8719 10.5 18.0984 10.418 18.2781 10.2682L21 8M6.5 14H6.51M17.5 14H17.51M8.16065 4.5H15.8394C16.5571 4.5 17.2198 4.88457 17.5758 5.50772L20.473 10.5777C20.8183 11.1821 21 11.8661 21 12.5623V18.5C21 19.0523 20.5523 19.5 20 19.5H19C18.4477 19.5 18 19.0523 18 18.5V17.5H6V18.5C6 19.0523 5.55228 19.5 5 19.5H4C3.44772 19.5 3 19.0523 3 18.5V12.5623C3 11.8661 3.18166 11.1821 3.52703 10.5777L6.42416 5.50772C6.78024 4.88457 7.44293 4.5 8.16065 4.5ZM7 14C7 14.2761 6.77614 14.5 6.5 14.5C6.22386 14.5 6 14.2761 6 14C6 13.7239 6.22386 13.5 6.5 13.5C6.77614 13.5 7 13.7239 7 14ZM18 14C18 14.2761 17.7761 14.5 17.5 14.5C17.2239 14.5 17 14.2761 17 14C17 13.7239 17.2239 13.5 17.5 13.5C17.7761 13.5 18 13.7239 18 14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                  </router-link>
              </nav>
          </div>

          <div class="flex justify-center py-5 border-t border-gray-800">
              <!-- Enlace a Configuración -->
              <router-link to="/configuracion" class="p-3 transition-all duration-300 rounded-lg group hover:bg-white/10" :class="{ 'bg-white/10': $route.path === '/configuracion' }">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 transition-colors duration-300" :class="{ 'text-blue-500': $route.path === '/configuracion', 'text-gray-400 group-hover:text-blue-500': $route.path !== '/configuracion' }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.25 2.25a.75.75 0 011.5 0v1.5a.75.75 0 01-1.5 0v-1.5zM4.22 4.22a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06L4.22 5.28a.75.75 0 010-1.06zm15.56 0a.75.75 0 010 1.06l-1.06 1.06a.75.75 0 11-1.06-1.06l1.06-1.06a.75.75 0 011.06 0zM12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm7.5 4.5a.75.75 0 010 1.5h-1.5a.75.75 0 010-1.5h1.5zm-15 0a.75.75 0 010 1.5H3a.75.75 0 010-1.5h1.5zm12.72 6.28a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zm-11.44 0a.75.75 0 010 1.06l1.06 1.06a.75.75 0 11-1.06-1.06l-1.06-1.06a.75.75 0 010-1.06zM12 19.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0112 19.5z" />
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
                      <div class="px-4 py-2 text-gray-800 border-b mb-2">
                        <div class="font-semibold">{{ authStore.user?.nombre }} {{ authStore.user?.apellidoPaterno }}</div>
                        <div class="text-xs text-gray-500">{{ authStore.user?.correoElectronico }}</div>
                      </div>
                      <router-link to="/perfil" class="block px-4 py-2 text-gray-800 transition-colors duration-300 rounded-lg cursor-pointer hover:bg-gray-100" @click="dropdownOpen = false">Perfil</router-link>
                      <div @click="showPasswordModal = true; dropdownOpen = false" class="px-4 py-2 text-gray-800 transition-colors duration-300 rounded-lg cursor-pointer hover:bg-gray-100">Cambiar contraseña</div>
                    </div>
                  </transition>
                </div>
                <button class="relative p-2 mx-3 text-gray-400 transition-colors duration-300 rounded-full hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100">
                  <span class="sr-only">Notifications</span>
                  <span class="absolute top-0 right-0 w-2 h-2 mt-1 mr-2 bg-blue-700 rounded-full"></span>
                  <span class="absolute top-0 right-0 w-2 h-2 mt-1 mr-2 bg-blue-700 rounded-full animate-ping"></span>
                  <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
                <button 
                  @click="cerrarSesion" 
                  class="p-2 text-gray-400 transition-colors duration-300 rounded-full focus:outline-none hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100"
                >
                  <span class="sr-only">Cerrar sesión</span>
                  <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
              </div>
          </header>

          <!-- Aquí se renderizará el contenido de cada página -->
          <router-view>
              
          </router-view>
      </main>
  </div>

  <div v-if="showPasswordModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
<div class="bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6 border border-gray-700">
  <div class="flex justify-between items-center mb-4">
    <h3 class="text-xl font-semibold text-white">Cambiar contraseña</h3>
    <button @click="showPasswordModal = false" class="text-gray-400 hover:text-white">
      <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
  
  <!-- Primera fase: verificar contraseña actual -->
  <div v-if="passwordStep === 1">
    <p class="text-gray-300 mb-4">Por favor ingresa tu contraseña actual para continuar</p>
    
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-400 mb-1">Contraseña actual</label>
      <input 
        type="password" 
        v-model="currentPassword" 
        class="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Ingresa tu contraseña actual"
      >
      <p v-if="passwordError" class="mt-1 text-sm text-red-500">{{ passwordError }}</p>
    </div>
    
    <div class="flex justify-end space-x-3">
      <button @click="showPasswordModal = false" class="px-4 py-2 text-gray-300 hover:text-white">
        Cancelar
      </button>
      <button 
        @click="verifyCurrentPassword" 
        class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        :disabled="!currentPassword"
      >
        Continuar
      </button>
    </div>
  </div>
  
  <!-- Segunda fase: ingresar nueva contraseña -->
  <div v-if="passwordStep === 2">
    <p class="text-gray-300 mb-4">Ingresa tu nueva contraseña</p>
    
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-400 mb-1">Nueva contraseña</label>
      <input 
        type="password" 
        v-model="newPassword" 
        class="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Ingresa tu nueva contraseña"
      >
    </div>
    
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-400 mb-1">Confirmar nueva contraseña</label>
      <input 
        type="password" 
        v-model="confirmPassword" 
        class="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Confirma tu nueva contraseña"
      >
      <p v-if="passwordError" class="mt-1 text-sm text-red-500">{{ passwordError }}</p>
    </div>
    
    <div class="flex justify-end space-x-3">
      <button @click="passwordStep = 1" class="px-4 py-2 text-gray-300 hover:text-white">
        Atrás
      </button>
      <button 
        @click="changePassword" 
        class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        :disabled="!newPassword || !confirmPassword"
      >
        Cambiar contraseña
      </button>
    </div>
  </div>
  
  <!-- Tercera fase: confirmación -->
  <div v-if="passwordStep === 3" class="text-center py-4">
    <div class="flex justify-center mb-4">
      <svg class="w-16 h-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <h3 class="text-xl font-medium text-white mb-2">¡Contraseña actualizada!</h3>
    <p class="text-gray-300 mb-4">Tu contraseña ha sido cambiada exitosamente.</p>
    <button 
      @click="closePasswordModal"
      class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
    >
      Cerrar
    </button>
  </div>
</div>
</div>

<div v-if="cerrandoSesion" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-[9999]">
<div class="bg-white rounded-xl shadow-2xl px-12 py-10 flex flex-col items-center animate-fade-in-up">
  <svg class="animate-spin h-12 w-12 text-red-600 mb-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
  <span class="text-2xl font-bold text-gray-800 mb-2 tracking-wide">Cerrando sesión</span>
  <span class="text-gray-500 text-base">Por favor espera un momento...</span>
</div>
</div>

<ToastNotificacion v-if="notificacion.visible" :mensaje="notificacion.mensaje" :tipo="notificacion.tipo" />
</template>

<script>
import { useAuthStore } from './components/stores/auth';
import axios from './axios';
import ToastNotificacion from './components/ui/ToastNotificacion.vue';
import { notificacionStore } from './components/stores/notificacion';

export default {
  data() {
      return {
          isOpen: false,
          dropdownOpen: false,
          // Variables para el modal de cambio de contraseña
          showPasswordModal: false,
          passwordStep: 1,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
          passwordError: '',
          cerrandoSesion: false
      }
  },
  computed: {
      // Detectar si estamos en una ruta de autenticación
      isAuthRoute() {
          // Lista de rutas de autenticación
          return this.$route.meta.layout === 'auth';
      },
      // Detectar si estamos en una ruta de administrador
      isAdminRoute() {
          // Verifica si la ruta actual comienza con '/admin'
          return this.$route.path.startsWith('/admin');
      }
  },
  methods: {
      // Método para cerrar sesión y redirigir a login
      cerrarSesion() {
          this.cerrandoSesion = true;
          const authStore = useAuthStore();
          authStore.logout();
          console.log('Sesión cerrada, token y usuario eliminados');
          setTimeout(() => {
              this.cerrandoSesion = false;
              this.$router.replace('/login');
          }, 1200);
      },

      
      // Métodos existentes...
      async verifyCurrentPassword() {
          if (this.currentPassword === '') {
              this.passwordError = 'Por favor ingresa tu contraseña actual';
              return;
          }

          // Lee el token directamente del storage
          const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token') || null;
          console.log('Token que se enviará:', token);

          try {
              const response = await axios.post(
                  '/api/auth/verify-password',
                  { currentPassword: this.currentPassword },
                  {
                      headers: {
                          Authorization: `Bearer ${token}`
                      }
                  }
              );
              
              if (response.data.success) {
                  this.passwordError = '';
                  this.passwordStep = 2;
              } else {
                  this.passwordError = 'Contraseña incorrecta';
              }
          } catch (error) {
              this.passwordError = error.response?.data?.message || 'Error al verificar la contraseña';
              console.error('Error:', error);
          }
      },
      
      async changePassword() {
        this.loading = true;
        this.error = null;

        try {
          // Lee el token directamente del storage
          const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token') || null;

          const response = await axios.post(
            '/api/auth/change-password',
            {
              currentPassword: this.currentPassword,
              newPassword: this.newPassword
            },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          if (response.data.success) {
            this.passwordError = '';
            this.passwordStep = 3;
          } else {
            this.passwordError = response.data.message || 'Error al cambiar la contraseña';
          }
        } catch (error) {
          this.passwordError = error.response?.data?.message || 'Error al cambiar la contraseña. Por favor, intenta nuevamente.';
          console.error('Error al cambiar contraseña:', error);
        } finally {
          this.loading = false;
        }
      },

      closePasswordModal() {
          // Reiniciar el modal
          this.showPasswordModal = false;
          this.passwordStep = 1;
          this.currentPassword = '';
          this.newPassword = '';
          this.confirmPassword = '';
          this.passwordError = '';
      },

      abrirModalVehiculo() {
        // Redirige a configuración y espera a que el componente Configuracion.vue abra el modal
        this.$router.push('/configuracion');
        // Puedes usar un event bus o almacenamiento global para comunicar la apertura del modal
        // Ejemplo simple con localStorage:
        localStorage.setItem('abrirModalVehiculo', '1');
      },

      getAvatarUrl(usuario) {
        if (usuario?.foto) {
          return usuario.foto;
        }
        const nombre = usuario?.nombre || '';
        const apellido = usuario?.apellidoPaterno || '';
        const apellidos = apellido + ' ' + (usuario?.apellidoMaterno || '');
        const fullName = encodeURIComponent((nombre + ' ' + apellidos).trim());
        return `https://ui-avatars.com/api/?name=${fullName}&background=random&color=fff&size=64`;
      },
  },
  setup() {
    const authStore = useAuthStore();
    return {
      authStore,
      notificacion: notificacionStore.state
    };
  },
  components: {
    ToastNotificacion
  },
}
</script>

<style>
@keyframes fade-in-up {
0% {
  opacity: 0;
  transform: translateY(40px);
}
100% {
  opacity: 1;
  transform: translateY(0);
}
}
.animate-fade-in-up {
animation: fade-in-up 0.7s cubic-bezier(0.23, 1, 0.32, 1);
}
</style>