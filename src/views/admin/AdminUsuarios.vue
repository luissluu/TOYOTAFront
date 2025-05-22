// src/views/admin/AdminUsuarios.vue
<template>
  <div class="flex flex-col w-full px-6">
    <section class="grid grid-cols-1 gap-8 px-8 md:grid-cols-1">
      <div class="bg-gray-800 md:col-span-1">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold tracking-tight text-white">Gestión de Usuarios</h2>
            <div class="flex items-center space-x-4">
              <div class="relative">
                <input 
                  type="text" 
                  v-model="busqueda" 
                  placeholder="Buscar usuario..." 
                  class="w-64 rounded-md bg-gray-600 border-gray-500 text-white px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <svg class="absolute left-3 top-3 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button 
                @click="mostrarFormulario = true" 
                class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center transition-colors duration-200"
              >
                <svg class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Añadir Usuario
              </button>
            </div>
          </div>
          
          <!-- Filtros -->
          <div class="flex flex-wrap gap-4 mb-6">
            <select 
              v-model="filtroRol" 
              class="rounded-md bg-gray-600 border-gray-500 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos los roles</option>
              <option value="1">Administrador</option>
              <option value="2">Mecánico</option>
              <option value="3">Cliente</option>
            </select>
            
            <select 
              v-model="filtroEstado" 
              class="rounded-md bg-gray-600 border-gray-500 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos los estados</option>
              <option value="1">Activo</option>
              <option value="0">Inactivo</option>
            </select>
          </div>
          
          <!-- Tabla de usuarios -->
          <div class="bg-gray-700 rounded-lg overflow-hidden">
            <div v-if="cargando" class="p-4 text-center text-white">
              Cargando usuarios...
            </div>
            <div v-else-if="error" class="p-4 text-center text-red-500">
              {{ error }}
            </div>
            <div v-else class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-600">
                <thead class="bg-gray-800">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nombre Completo</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Teléfono</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Rol</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Ciudad</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody class="bg-gray-700 divide-y divide-gray-600">
                  <tr v-for="usuario in usuariosFiltrados" :key="usuario.id" class="hover:bg-gray-600 transition-colors duration-200">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">
                      <img :src="getAvatarUrl(usuario)" alt="Avatar" class="w-10 h-10 rounded-full border-2 border-gray-600 bg-gray-800 object-cover mr-2 inline-block align-middle" />
                      {{ usuario.id }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="ml-4">
                          <div class="text-sm font-medium text-white">
                            {{ usuario.nombre }} {{ usuario.apellidoPaterno }} {{ usuario.apellidoMaterno }}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">{{ usuario.correoElectronico }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">{{ usuario.telefono }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" 
                        :class="{
                          'bg-purple-100 text-purple-800': usuario.rol_id === 1,
                          'bg-blue-100 text-blue-800': usuario.rol_id === 2,
                          'bg-green-100 text-green-800': usuario.rol_id === 3
                        }"
                      >
                        {{ getRolNombre(usuario.rol_id) }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">{{ usuario.ciudad }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div class="flex space-x-3">
                        <button 
                          @click="editarUsuario(usuario)" 
                          class="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                        >
                          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button 
                          @click="confirmarEliminacion(usuario)" 
                          class="text-red-400 hover:text-red-300 transition-colors duration-200"
                        >
                          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                        <button 
                          @click="verDetalles(usuario)" 
                          class="text-gray-400 hover:text-gray-300 transition-colors duration-200"
                        >
                          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- Paginación -->
            <div class="bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-700 sm:px-6">
              <div class="flex-1 flex justify-between sm:hidden">
                <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Anterior
                </button>
                <button class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Siguiente
                </button>
              </div>
              <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p class="text-sm text-gray-400">
                    Mostrando
                    <span class="font-medium">{{ paginacion.desde }}</span>
                    a
                    <span class="font-medium">{{ paginacion.hasta }}</span>
                    de
                    <span class="font-medium">{{ paginacion.total }}</span>
                    resultados
                  </p>
                </div>
                <div>
                  <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button 
                      @click="cambiarPagina(paginacion.paginaActual - 1)"
                      :disabled="paginacion.paginaActual === 1"
                      class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-600 bg-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span class="sr-only">Anterior</span>
                      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </button>
                    <button 
                      v-for="pagina in paginacion.totalPaginas" 
                      :key="pagina"
                      @click="cambiarPagina(pagina)"
                      :class="[
                        'relative inline-flex items-center px-4 py-2 border border-gray-600 text-sm font-medium',
                        pagina === paginacion.paginaActual 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      ]"
                    >
                      {{ pagina }}
                    </button>
                    <button 
                      @click="cambiarPagina(paginacion.paginaActual + 1)"
                      :disabled="paginacion.paginaActual === paginacion.totalPaginas"
                      class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-600 bg-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span class="sr-only">Siguiente</span>
                      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal para añadir/editar usuario -->
    <div v-if="mostrarFormulario" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="absolute inset-0 bg-black opacity-50" @click="mostrarFormulario = false"></div>
      <div class="relative bg-gray-800 max-w-md w-full mx-auto rounded-lg shadow-lg p-6">
        <button @click="mostrarFormulario = false" class="absolute top-4 right-4 text-gray-400 hover:text-white">
          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <h3 class="text-xl font-medium text-white mb-4">{{ usuarioSeleccionado ? 'Editar Usuario' : 'Añadir Nuevo Usuario' }}</h3>
        
        <form @submit.prevent="guardarUsuario" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">Nombre</label>
              <input 
                type="text" 
                v-model="formulario.nombre" 
                class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                required
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">Apellido Paterno</label>
              <input 
                type="text" 
                v-model="formulario.apellidoPaterno" 
                class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                required
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">Apellido Materno</label>
              <input 
                type="text" 
                v-model="formulario.apellidoMaterno" 
                class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                required
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">Email</label>
              <input 
                type="email" 
                v-model="formulario.correoElectronico" 
                class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                required
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">Teléfono</label>
              <input 
                type="tel" 
                v-model="formulario.telefono" 
                class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">Rol</label>
              <select 
                v-model="formulario.rol_id" 
                class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="1">Administrador</option>
                <option value="2">Mecánico</option>
                <option value="3">Cliente</option>
              </select>
            </div>

            <!-- Campo de contraseña solo si es nuevo usuario y rol admin o cliente -->
            <div v-if="!usuarioSeleccionado && (formulario.rol_id === '1' || formulario.rol_id === '3')">
              <label class="block text-sm font-medium text-gray-400 mb-1">Contraseña</label>
              <input 
                type="password" 
                v-model="formulario.contraseña" 
                class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                required
                minlength="8"
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$"
                title="La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número"
                autocomplete="new-password"
              >
              <small class="text-gray-400">Mínimo 8 caracteres, una mayúscula, una minúscula y un número</small>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">Ciudad</label>
              <input 
                type="text" 
                v-model="formulario.ciudad" 
                class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">Estado/Provincia</label>
              <input 
                type="text" 
                v-model="formulario.estado_provincia" 
                class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">Código Postal</label>
              <input 
                type="text" 
                v-model="formulario.codigo_postal" 
                class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">Fecha de Nacimiento</label>
              <input 
                type="date" 
                v-model="formulario.fecha_nacimiento" 
                class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
          </div>
          
          <div class="flex justify-end space-x-3 mt-6">
            <button 
              type="button" 
              @click="mostrarFormulario = false" 
              class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors duration-200"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              {{ usuarioSeleccionado ? 'Actualizar' : 'Guardar' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal de confirmación para eliminar -->
    <div v-if="mostrarConfirmacion" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="absolute inset-0 bg-black opacity-50" @click="mostrarConfirmacion = false"></div>
      <div class="relative bg-gray-800 max-w-md w-full mx-auto rounded-lg shadow-lg p-6">
        <h3 class="text-xl font-medium text-white mb-4">Confirmar Eliminación</h3>
        <p class="text-gray-400 mb-6">¿Estás seguro de que deseas eliminar al usuario {{ usuarioAEliminar?.nombre }}? Esta acción no se puede deshacer.</p>
        
        <div class="flex justify-end space-x-3">
          <button 
            @click="mostrarConfirmacion = false" 
            class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors duration-200"
          >
            Cancelar
          </button>
          <button 
            @click="eliminarUsuario" 
            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { usuarioService } from '../../services/usuarioService';
import { notificacionStore } from '../../components/stores/notificacion';

export default {
  name: 'AdminUsuarios',
  setup() {
    const mostrarFormulario = ref(false);
    const mostrarConfirmacion = ref(false);
    const usuarioSeleccionado = ref(null);
    const usuarioAEliminar = ref(null);
    const busqueda = ref('');
    const filtroRol = ref('');
    const filtroEstado = ref('');
    const usuarios = ref([]);
    const cargando = ref(true);
    const error = ref(null);

    const formulario = ref({
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      correoElectronico: '',
      telefono: '',
      fecha_nacimiento: '',
      ciudad: '',
      estado_provincia: '',
      codigo_postal: '',
      contraseña: '',
      rol_id: ''
    });

    const roles = {
      1: 'Administrador',
      2: 'Mecánico',
      3: 'Cliente'
    };

    const getRolNombre = (rolId) => {
      return roles[rolId] || 'Desconocido';
    };

    const paginacion = ref({
      paginaActual: 1,
      totalPaginas: 1,
      desde: 1,
      hasta: 10,
      total: 0
    });

    // Cargar usuarios
    const cargarUsuarios = async () => {
      try {
        cargando.value = true;
        error.value = null;
        const data = await usuarioService.getUsuarios();
        // Mapear usuario_id a id para compatibilidad en frontend
        usuarios.value = data.map(u => ({ ...u, id: u.usuario_id || u.id }));
        paginacion.value.total = data.length;
        paginacion.value.totalPaginas = Math.ceil(data.length / 10);
      } catch (err) {
        error.value = 'Error al cargar los usuarios';
        console.error('Error:', err);
      } finally {
        cargando.value = false;
      }
    };

    // Filtrar usuarios
    const usuariosFiltrados = computed(() => {
      return usuarios.value.filter(usuario => {
        const coincideBusqueda = 
          usuario.nombre?.toLowerCase().includes(busqueda.value.toLowerCase()) ||
          usuario.apellidoPaterno?.toLowerCase().includes(busqueda.value.toLowerCase()) ||
          usuario.correoElectronico?.toLowerCase().includes(busqueda.value.toLowerCase());
        
        const coincideRol = !filtroRol.value || usuario.rol_id === parseInt(filtroRol.value);
        
        return coincideBusqueda && coincideRol;
      });
    });

    // Editar usuario
    const editarUsuario = (usuario) => {
      usuarioSeleccionado.value = usuario;
      // Formatear la fecha de nacimiento para el input type="date"
      const fechaNacimiento = usuario.fecha_nacimiento ? new Date(usuario.fecha_nacimiento).toISOString().split('T')[0] : '';
      formulario.value = { 
        ...usuario,
        rol_id: usuario.rol_id.toString(), // Convertir a string para el select
        fecha_nacimiento: fechaNacimiento
      };
      mostrarFormulario.value = true;
    };

    // Confirmar eliminación
    const confirmarEliminacion = (usuario) => {
      usuarioAEliminar.value = usuario;
      mostrarConfirmacion.value = true;
    };

    // Eliminar usuario
    const eliminarUsuario = async () => {
      try {
        const id = usuarioAEliminar.value?.id;
        if (!id) {
          notificacionStore.mostrar('Error: ID de usuario no válido', 'error');
          error.value = 'ID de usuario no válido';
          return;
        }
        await usuarioService.eliminarUsuario(id);
        notificacionStore.mostrar('Usuario eliminado correctamente', 'success');
        await cargarUsuarios();
        mostrarConfirmacion.value = false;
      } catch (err) {
        notificacionStore.mostrar('Error al eliminar el usuario', 'error');
        error.value = 'Error al eliminar el usuario';
        console.error(err);
      }
    };

    // Guardar usuario
    const guardarUsuario = async () => {
      try {
        if (usuarioSeleccionado.value) {
          await usuarioService.actualizarUsuario(usuarioSeleccionado.value.id, formulario.value);
          notificacionStore.mostrar('Usuario actualizado correctamente', 'success');
        } else {
          await usuarioService.crearUsuario(formulario.value);
          notificacionStore.mostrar('Usuario creado correctamente', 'success');
        }
        await cargarUsuarios();
        // Reiniciar valores del formulario y cerrar el modal
        formulario.value = {
          nombre: '',
          apellidoPaterno: '',
          apellidoMaterno: '',
          correoElectronico: '',
          telefono: '',
          fecha_nacimiento: '',
          ciudad: '',
          estado_provincia: '',
          codigo_postal: '',
          contraseña: '',
          rol_id: ''
        };
        usuarioSeleccionado.value = null;
        mostrarFormulario.value = false;
      } catch (err) {
        notificacionStore.mostrar('Error al guardar el usuario', 'error');
        error.value = 'Error al guardar el usuario';
        console.error(err);
      }
    };

    // Cambiar página
    const cambiarPagina = (pagina) => {
      paginacion.value.paginaActual = pagina;
      paginacion.value.desde = (pagina - 1) * 10 + 1;
      paginacion.value.hasta = Math.min(pagina * 10, paginacion.value.total);
    };

    // Ver detalles
    const verDetalles = (usuario) => {
      // Implementar vista de detalles si es necesario
      console.log('Ver detalles de:', usuario);
    };

    const getAvatarUrl = (usuario) => {
      if (usuario.foto) {
        return usuario.foto;
      }
      const nombre = usuario.nombre || '';
      const apellido = usuario.apellidoPaterno || '';
      const apellidos = apellido + ' ' + (usuario.apellidoMaterno || '');
      const fullName = encodeURIComponent((nombre + ' ' + apellidos).trim());
      return `https://ui-avatars.com/api/?name=${fullName}&background=random&color=fff&size=64`;
    };

    onMounted(() => {
      cargarUsuarios();
    });

    return {
      mostrarFormulario,
      mostrarConfirmacion,
      usuarioSeleccionado,
      usuarioAEliminar,
      busqueda,
      filtroRol,
      filtroEstado,
      usuarios,
      usuariosFiltrados,
      cargando,
      error,
      formulario,
      paginacion,
      editarUsuario,
      confirmarEliminacion,
      eliminarUsuario,
      guardarUsuario,
      cambiarPagina,
      verDetalles,
      getRolNombre,
      getAvatarUrl
    };
  }
};
</script>