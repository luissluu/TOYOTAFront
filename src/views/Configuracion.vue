<!-- src/views/Configuracion.vue -->
<template>
  <div class="flex flex-col w-full px-6">
    <section class="grid grid-cols-1 gap-8 px-8 md:grid-cols-2">
      <div class="bg-gray-800 md:col-span-2">
        <div class="mx-auto max-w-2xl px-4 py-1 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-8">
          <h2 class="text-2xl font-bold tracking-tight text-white">Configuración</h2>
          
          <div class="mt-6 text-white">
            <!-- Secciones de configuración -->
            <div class="mt-8">
              <!-- Sección 1: Perfil -->
              <div class="mb-8">
                <h3 class="text-xl font-semibold text-white border-b border-gray-600 pb-2 mb-4">Perfil de Usuario</h3>
                <div class="bg-gray-700 rounded-lg p-6">
                  <div class="flex flex-col md:flex-row md:items-start">
                    <div class="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                      <img
                        v-if="usuarioPerfil"
                        :src="getAvatarUrl(usuarioPerfil)"
                        alt="Avatar"
                        class="w-24 h-24 rounded-full border-4 border-gray-700 bg-gray-900 object-cover shadow-lg"
                      />
                    </div>
                    <div class="flex-grow">
                      <FormularioPerfil 
                        :usuario="usuarioPerfil" 
                        @guardar="guardarPerfilUsuario" 
                        @cancelar="cancelarEdicionPerfil"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Sección 2: Vehículos -->
              <div class="mb-8">
                <h3 class="text-xl font-semibold text-white border-b border-gray-600 pb-2 mb-4">Mis Vehículos</h3>
                
                <!-- Lista de vehículos existentes -->
                <div class="bg-gray-700 rounded-lg p-6 mb-4">
                  <div class="flex justify-between items-center mb-4">
                    <h4 class="text-lg font-medium text-white">Vehículos Registrados</h4>
                    <button 
                      @click="mostrarFormularioVehiculo = true; modoFormularioVehiculo = 'agregar'; vehiculoEditando = null"
                      class="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                      + Añadir Vehículo
                    </button>
                  </div>
                  
                  <!-- Lista de vehículos -->
                  <div class="space-y-4">
                    <div 
                      v-for="vehiculo in vehiculos" 
                      :key="vehiculo.id" 
                      class="bg-gray-800 rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center"
                    >
                      <div>
                        <h5 class="text-white font-medium">{{ vehiculo.marca }} {{ vehiculo.modelo }} {{ vehiculo.ano }}</h5>
                        <p class="text-gray-400 text-sm">VIN: {{ vehiculo.vin || 'No especificado' }}</p>
                        <p v-if="vehiculo.principal" class="mt-1 text-xs bg-blue-600 text-white px-2 py-0.5 rounded-sm inline-block">Principal</p>
                      </div>
                      <div class="flex mt-2 md:mt-0">
                        <button 
                          @click="editarVehiculo(vehiculo)" 
                          class="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md mr-2"
                        >
                          Editar
                        </button>
                        <button 
                          @click="eliminarVehiculo(vehiculo.id)" 
                          class="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                    
                    <!-- Mensaje si no hay vehículos -->
                    <div v-if="vehiculos.length === 0" class="text-center text-gray-400 py-4">
                      No tienes vehículos registrados.
                    </div>
                  </div>
                </div>
                
                <!-- Formulario de vehículo (modal) -->
                <div v-if="mostrarFormularioVehiculo" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div class="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
                    <FormularioVehiculo 
                      :vehiculo="vehiculoEditando" 
                      :modo="modoFormularioVehiculo" 
                      @guardar="guardarVehiculo" 
                      @cancelar="cancelarFormularioVehiculo"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <ToastNotificacion v-if="toast.visible" :mensaje="toast.mensaje" :tipo="toast.tipo" />
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import { useAuthStore } from '../components/stores/auth';
import FormularioVehiculo from '../components/configuracion/FormularioVehiculo.vue';
import FormularioPerfil from '../components/perfil/FormularioPerfil.vue';
import ToastNotificacion from '../components/ui/ToastNotificacion.vue';
import * as vehiculoService from '../services/vehiculoService';

export default {
  name: 'ConfiguracionPage',
  components: {
    FormularioVehiculo,
    FormularioPerfil,
    ToastNotificacion
  },
  setup() {
    const authStore = useAuthStore();
    const usuarioPerfil = ref(authStore.user);
    const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
    const toast = ref({ visible: false, mensaje: '', tipo: 'info' });
    onMounted(async () => {
      if (authStore.fetchUser) {
        usuarioPerfil.value = await authStore.fetchUser();
      } else {
        usuarioPerfil.value = authStore.user;
      }
      await cargarVehiculos();
      // Solo abrir modal si se solicitó explícitamente
      if (localStorage.getItem('abrirModalVehiculo') === '1') {
        mostrarFormularioVehiculo.value = true;
        modoFormularioVehiculo.value = 'agregar';
        vehiculoEditando.value = null;
        localStorage.removeItem('abrirModalVehiculo');
      }
    });
    
    // Estado de vehículos
    const vehiculos = ref([]);
    const cargarVehiculos = async () => {
      try {
        const vehiculosRaw = await vehiculoService.getVehiculos(token);
        // Mapea para asegurar que cada vehículo tenga un campo 'id'
        vehiculos.value = vehiculosRaw.map(v => ({
          ...v,
          id: v.vehiculo_id || v.id
        }));
      } catch (e) {
        vehiculos.value = [];
      }
    };
    
    // Estado para el formulario de vehículos
    const mostrarFormularioVehiculo = ref(false);
    const modoFormularioVehiculo = ref('agregar');
    const vehiculoEditando = ref(null);
    
    // Métodos para el formulario de vehículos
    const editarVehiculo = (vehiculo) => {
      vehiculoEditando.value = { 
        ...vehiculo,
        ano: vehiculo.año // Mapea año a ano para el formulario
      };
      modoFormularioVehiculo.value = 'editar';
      mostrarFormularioVehiculo.value = true;
    };
    
    const eliminarVehiculo = async (id) => {
      if (confirm('¿Estás seguro de eliminar este vehículo?')) {
        await vehiculoService.deleteVehiculo(id, token);
        await cargarVehiculos();
        toast.value = { visible: true, mensaje: 'Vehículo eliminado correctamente', tipo: 'success' };
      }
    };
    
    const guardarVehiculo = async (vehiculo) => {
      const vehiculoPayload = {
        ...vehiculo,
        año: vehiculo.ano,
      };
      delete vehiculoPayload.ano;
      const idVehiculo = vehiculo.vehiculo_id || vehiculo.id;
      if (modoFormularioVehiculo.value === 'editar') {
        if (!idVehiculo) {
          alert('Error: No se encontró el ID del vehículo para editar.');
          return;
        }
        await vehiculoService.updateVehiculo(idVehiculo, vehiculoPayload, token);
        toast.value = { visible: true, mensaje: 'Vehículo actualizado correctamente', tipo: 'success' };
      } else {
        await vehiculoService.createVehiculo(vehiculoPayload, token);
        toast.value = { visible: true, mensaje: 'Vehículo registrado correctamente', tipo: 'success' };
      }
      await cargarVehiculos();
      mostrarFormularioVehiculo.value = false;
      vehiculoEditando.value = null;
    };
    
    const cancelarFormularioVehiculo = () => {
      mostrarFormularioVehiculo.value = false;
      vehiculoEditando.value = null;
    };
    
    // Métodos para el formulario de perfil
    const guardarPerfilUsuario = (datos) => {
      console.log('Guardando datos del perfil:', datos);
      
      // Actualizar cada propiedad individualmente para asegurar la reactividad
      Object.keys(datos).forEach(key => {
        if (key in usuarioPerfil.value) {
          usuarioPerfil.value[key] = datos[key];
        }
      });
      
      // Forzar una actualización de la referencia para garantizar la reactividad
      usuarioPerfil.value = { ...usuarioPerfil.value };
      
      // Mostrar una notificación de éxito
      alert('Perfil actualizado correctamente');
    };
    
    const cancelarEdicionPerfil = () => {
      console.log('Edición del perfil cancelada');
      // Aquí podrías restaurar valores originales si lo deseas
    };

    function getAvatarUrl(usuario) {
      if (usuario?.foto) {
        return usuario.foto;
      }
      const nombre = usuario?.nombre || '';
      const apellido = usuario?.apellidoPaterno || '';
      const apellidos = apellido + ' ' + (usuario?.apellidoMaterno || '');
      const fullName = encodeURIComponent((nombre + ' ' + apellidos).trim());
      return `https://ui-avatars.com/api/?name=${fullName}&background=random&color=fff&size=96`;
    }
    
    return {
      vehiculos,
      mostrarFormularioVehiculo,
      modoFormularioVehiculo,
      vehiculoEditando,
      usuarioPerfil,
      editarVehiculo,
      eliminarVehiculo,
      guardarVehiculo,
      cancelarFormularioVehiculo,
      guardarPerfilUsuario,
      cancelarEdicionPerfil,
      toast,
      getAvatarUrl
    };
  }
};
</script>