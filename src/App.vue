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
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 transition-colors duration-300" :class="{ 'text-blue-500': $route.path === '/Servicios', 'text-gray-400 group-hover:text-blue-500': $route.path !== '/Servicios' }" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                      </svg>
                  </router-link>

                  <!-- Enlace a Historial de Servicio -->
                  <router-link to="/Historial" class="p-3 transition-all duration-300 rounded-lg group hover:bg-white/10" :class="{ 'bg-white/10': $route.path === '/Historial' }">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 transition-colors duration-300" :class="{ 'text-blue-500': $route.path === '/Historial', 'text-gray-400 group-hover:text-blue-500': $route.path !== '/Historial' }" viewBox="0 0 24 24" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.01112 11.5747L6.29288 10.2929C6.68341 9.90236 7.31657 9.90236 7.7071 10.2929C8.09762 10.6834 8.09762 11.3166 7.7071 11.7071L4.7071 14.7071C4.51956 14.8946 4.26521 15 3.99999 15C3.73477 15 3.48042 14.8946 3.29288 14.7071L0.292884 11.7071C-0.0976406 11.3166 -0.0976406 10.6834 0.292884 10.2929C0.683408 9.90236 1.31657 9.90236 1.7071 10.2929L3.0081 11.5939C3.22117 6.25933 7.61317 2 13 2C18.5229 2 23 6.47715 23 12C23 17.5228 18.5229 22 13 22C9.85817 22 7.05429 20.5499 5.22263 18.2864C4.87522 17.8571 4.94163 17.2274 5.37096 16.88C5.80028 16.5326 6.42996 16.599 6.77737 17.0283C8.24562 18.8427 10.4873 20 13 20C17.4183 20 21 16.4183 21 12C21 7.58172 17.4183 4 13 4C8.72441 4 5.23221 7.35412 5.01112 11.5747ZM13 5C13.5523 5 14 5.44772 14 6V11.5858L16.7071 14.2929C17.0976 14.6834 17.0976 15.3166 16.7071 15.7071C16.3166 16.0976 15.6834 16.0976 15.2929 15.7071L12.2929 12.7071C12.1054 12.5196 12 12.2652 12 12V6C12 5.44772 12.4477 5 13 5Z" fill="currentColor"></path>
                    </svg>
                  </router-link>
              </nav>
          </div>

          <div class="flex justify-center py-5 border-t border-gray-800">
              <!-- Enlace a Configuración -->
              <router-link to="/configuracion" class="p-3 transition-all duration-300 rounded-lg group hover:bg-white/10" :class="{ 'bg-white/10': $route.path === '/configuracion' }">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 transition-colors duration-300" :class="{ 'text-blue-500': $route.path === '/configuracion', 'text-gray-400 group-hover:text-blue-500': $route.path !== '/configuracion' }" viewBox="0 0 28 28" fill="none">
                    <path clip-rule="evenodd" d="M14 20C17.3137 20 20 17.3137 20 14C20 10.6863 17.3137 8 14 8C10.6863 8 8 10.6863 8 14C8 17.3137 10.6863 20 14 20ZM18 14C18 16.2091 16.2091 18 14 18C11.7909 18 10 16.2091 10 14C10 11.7909 11.7909 10 14 10C16.2091 10 18 11.7909 18 14Z" fill="currentColor" fill-rule="evenodd"></path>
                    <path clip-rule="evenodd" d="M0 12.9996V14.9996C0 16.5478 1.17261 17.822 2.67809 17.9826C2.80588 18.3459 2.95062 18.7011 3.11133 19.0473C2.12484 20.226 2.18536 21.984 3.29291 23.0916L4.70712 24.5058C5.78946 25.5881 7.49305 25.6706 8.67003 24.7531C9.1044 24.9688 9.55383 25.159 10.0163 25.3218C10.1769 26.8273 11.4511 28 12.9993 28H14.9993C16.5471 28 17.8211 26.8279 17.9821 25.3228C18.4024 25.175 18.8119 25.0046 19.2091 24.8129C20.3823 25.6664 22.0344 25.564 23.0926 24.5058L24.5068 23.0916C25.565 22.0334 25.6674 20.3813 24.814 19.2081C25.0054 18.8113 25.1757 18.4023 25.3234 17.9824C26.8282 17.8211 28 16.5472 28 14.9996V12.9996C28 11.452 26.8282 10.1782 25.3234 10.0169C25.1605 9.55375 24.9701 9.10374 24.7541 8.66883C25.6708 7.49189 25.5882 5.78888 24.5061 4.70681L23.0919 3.29259C21.9846 2.18531 20.2271 2.12455 19.0485 3.1103C18.7017 2.94935 18.3459 2.80441 17.982 2.67647C17.8207 1.17177 16.5468 0 14.9993 0H12.9993C11.4514 0 10.1773 1.17231 10.0164 2.6775C9.60779 2.8213 9.20936 2.98653 8.82251 3.17181C7.64444 2.12251 5.83764 2.16276 4.70782 3.29259L3.2936 4.7068C2.16377 5.83664 2.12352 7.64345 3.17285 8.82152C2.98737 9.20877 2.82199 9.60763 2.67809 10.0167C1.17261 10.1773 0 11.4515 0 12.9996ZM15.9993 3C15.9993 2.44772 15.5516 2 14.9993 2H12.9993C12.447 2 11.9993 2.44772 11.9993 3V3.38269C11.9993 3.85823 11.6626 4.26276 11.2059 4.39542C10.4966 4.60148 9.81974 4.88401 9.18495 5.23348C8.76836 5.46282 8.24425 5.41481 7.90799 5.07855L7.53624 4.70681C7.14572 4.31628 6.51256 4.31628 6.12203 4.7068L4.70782 6.12102C4.31729 6.51154 4.31729 7.14471 4.70782 7.53523L5.07958 7.90699C5.41584 8.24325 5.46385 8.76736 5.23451 9.18395C4.88485 9.8191 4.6022 10.4963 4.39611 11.2061C4.2635 11.6629 3.85894 11.9996 3.38334 11.9996H3C2.44772 11.9996 2 12.4474 2 12.9996V14.9996C2 15.5519 2.44772 15.9996 3 15.9996H3.38334C3.85894 15.9996 4.26349 16.3364 4.39611 16.7931C4.58954 17.4594 4.85042 18.0969 5.17085 18.6979C5.39202 19.1127 5.34095 19.6293 5.00855 19.9617L4.70712 20.2632C4.3166 20.6537 4.3166 21.2868 4.70712 21.6774L6.12134 23.0916C6.51186 23.4821 7.14503 23.4821 7.53555 23.0916L7.77887 22.8483C8.11899 22.5081 8.65055 22.4633 9.06879 22.7008C9.73695 23.0804 10.4531 23.3852 11.2059 23.6039C11.6626 23.7365 11.9993 24.1411 11.9993 24.6166V25C11.9993 25.5523 12.447 26 12.9993 26H14.9993C15.5516 26 15.9993 25.5523 15.9993 25V24.6174C15.9993 24.1418 16.3361 23.7372 16.7929 23.6046C17.5032 23.3985 18.1809 23.1157 18.8164 22.7658C19.233 22.5365 19.7571 22.5845 20.0934 22.9208L20.2642 23.0916C20.6547 23.4821 21.2879 23.4821 21.6784 23.0916L23.0926 21.6774C23.4831 21.2868 23.4831 20.6537 23.0926 20.2632L22.9218 20.0924C22.5855 19.7561 22.5375 19.232 22.7669 18.8154C23.1166 18.1802 23.3992 17.503 23.6053 16.7931C23.7379 16.3364 24.1425 15.9996 24.6181 15.9996H25C25.5523 15.9996 26 15.5519 26 14.9996V12.9996C26 12.4474 25.5523 11.9996 25 11.9996H24.6181C24.1425 11.9996 23.7379 11.6629 23.6053 11.2061C23.3866 10.4529 23.0817 9.73627 22.7019 9.06773C22.4643 8.64949 22.5092 8.11793 22.8493 7.77781L23.0919 7.53523C23.4824 7.14471 23.4824 6.51154 23.0919 6.12102L21.6777 4.7068C21.2872 4.31628 20.654 4.31628 20.2635 4.7068L19.9628 5.00748C19.6304 5.33988 19.1137 5.39096 18.6989 5.16979C18.0976 4.84915 17.4596 4.58815 16.7929 4.39467C16.3361 4.2621 15.9993 3.85752 15.9993 3.38187V3Z" fill="currentColor" fill-rule="evenodd"></path>
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

      añadirVehiculo() {
        this.dropdownOpen = false;
        this.$router.push('/configuracion');
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