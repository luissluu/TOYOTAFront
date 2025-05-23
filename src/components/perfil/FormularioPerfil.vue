<template>
    <div class="bg-gray-700 rounded-lg p-6">
      <!-- Vista de solo lectura -->
      <div v-if="!modoEdicion">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Nombre</label>
            <p class="bg-gray-600 px-3 py-2 rounded-md text-white">{{ usuario.nombre }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Apellido Paterno</label>
            <p class="bg-gray-600 px-3 py-2 rounded-md text-white">{{ usuario.apellidoPaterno }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Apellido Materno</label>
            <p class="bg-gray-600 px-3 py-2 rounded-md text-white">{{ usuario.apellidoMaterno }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Email</label>
            <p class="bg-gray-600 px-3 py-2 rounded-md text-white">{{ usuario.correoElectronico }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Teléfono</label>
            <p class="bg-gray-600 px-3 py-2 rounded-md text-white">{{ usuario.telefono || 'No especificado' }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Fecha de Nacimiento</label>
            <p class="bg-gray-600 px-3 py-2 rounded-md text-white">{{ formatearFecha(usuario.fechaNacimiento) || 'No especificada' }}</p>
          </div>
        </div>
        <div class="mt-4">
          <button 
            @click="activarModoEdicion" 
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Editar Perfil
          </button>
        </div>
      </div>
  
      <!-- Vista de formulario editable -->
      <div v-else>
        <form @submit.prevent="manejarSubmit" class="space-y-4">
          <!-- Nombre -->
          <CampoValidado
            id="nombre"
            v-model="formulario.nombre"
            :error="errores.nombre"
            @update:error="errores.nombre = $event"
            @validacion="validacionCampo('nombre', $event)"
            @blur="alPerderFoco('nombre')"
            label="Nombre"
            placeholder="Tu nombre"
            required
            soloLetras
            :validator="validarSoloLetras"
            errorMessage="Por favor ingresa un nombre válido (solo letras)"
          >
            <template #icono>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
            </template>
          </CampoValidado>
    
          <!-- Apellido Paterno -->
          <CampoValidado
            id="apellidoPaterno"
            v-model="formulario.apellidoPaterno"
            :error="errores.apellidoPaterno"
            @update:error="errores.apellidoPaterno = $event"
            @validacion="validacionCampo('apellidoPaterno', $event)"
            @blur="alPerderFoco('apellidoPaterno')"
            label="Apellido Paterno"
            placeholder="Tu apellido paterno"
            required
            soloLetras
            :validator="validarSoloLetras"
            errorMessage="Por favor ingresa un apellido paterno válido (solo letras)"
          >
            <template #icono>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
            </template>
          </CampoValidado>
    
          <!-- Apellido Materno -->
          <CampoValidado
            id="apellidoMaterno"
            v-model="formulario.apellidoMaterno"
            :error="errores.apellidoMaterno"
            @update:error="errores.apellidoMaterno = $event"
            @validacion="validacionCampo('apellidoMaterno', $event)"
            @blur="alPerderFoco('apellidoMaterno')"
            label="Apellido Materno"
            placeholder="Tu apellido materno"
            required
            soloLetras
            :validator="validarSoloLetras"
            errorMessage="Por favor ingresa un apellido materno válido (solo letras)"
          >
            <template #icono>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
            </template>
          </CampoValidado>
    
          <!-- Email -->
          <CampoValidado
            id="correoElectronico"
            v-model="formulario.correoElectronico"
            :error="errores.correoElectronico"
            @update:error="errores.correoElectronico = $event"
            @validacion="validacionCampo('correoElectronico', $event)"
            @blur="alPerderFoco('correoElectronico')"
            label="Correo Electrónico"
            placeholder="correo@ejemplo.com"
            required
            :validator="validarEmail"
            errorMessage="Por favor ingresa un correo electrónico válido"
            autocomplete="email"
          >
            <template #icono>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </template>
          </CampoValidado>
    
          <!-- Teléfono -->
          <CampoValidado
            id="telefono"
            v-model="formulario.telefono"
            :error="errores.telefono"
            @update:error="errores.telefono = $event"
            @validacion="validacionCampo('telefono', $event)"
            @blur="alPerderFoco('telefono')"
            label="Teléfono"
            placeholder="(123) 456-7890"
            type="tel"
            soloNumeros
            :validator="validarTelefono"
            errorMessage="Por favor ingresa un número de teléfono válido"
          >
            <template #icono>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </template>
          </CampoValidado>
    
          <!-- Fecha de Nacimiento -->
          <CampoValidado
            id="fechaNacimiento"
            v-model="formulario.fechaNacimiento"
            :error="errores.fechaNacimiento"
            @update:error="errores.fechaNacimiento = $event"
            @validacion="validacionCampo('fechaNacimiento', $event)"
            @blur="alPerderFoco('fechaNacimiento')"
            label="Fecha de Nacimiento"
            type="date"
            :validator="validarFechaNacimiento"
            errorMessage="Por favor ingresa una fecha de nacimiento válida"
          >
            <template #icono>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
              </svg>
            </template>
          </CampoValidado>
    
          <!-- Contraseña -->
          <CampoValidado
            id="contraseña"
            v-model="formulario.contraseña"
            :error="errores.contraseña"
            @update:error="errores.contraseña = $event"
            @validacion="validacionCampo('contraseña', $event)"
            @blur="alPerderFoco('contraseña')"
            label="Contraseña"
            type="password"
            placeholder="Tu contraseña"
            required
            :validator="validarContraseña"
            errorMessage="La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número"
          >
            <template #icono>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
            </template>
          </CampoValidado>
    
          <!-- Dirección -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-300">Dirección</h3>
            
            <!-- Calle -->
            <CampoValidado
              id="calle"
              v-model="formulario.calle"
              :error="errores.calle"
              @update:error="errores.calle = $event"
              @validacion="validacionCampo('calle', $event)"
              @blur="alPerderFoco('calle')"
              label="Calle"
              placeholder="Nombre de la calle"
              required
              :validator="validarSoloLetras"
              errorMessage="Por favor ingresa el nombre de la calle"
            >
              <template #icono>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
              </template>
            </CampoValidado>

            <!-- Número -->
            <CampoValidado
              id="numero"
              v-model="formulario.numero"
              :error="errores.numero"
              @update:error="errores.numero = $event"
              @validacion="validacionCampo('numero', $event)"
              @blur="alPerderFoco('numero')"
              label="Número"
              placeholder="Número exterior"
              required
              soloNumeros
              :validator="validarNumero"
              errorMessage="Por favor ingresa el número de la dirección"
            >
              <template #icono>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
              </template>
            </CampoValidado>

            <!-- Colonia -->
            <CampoValidado
              id="colonia"
              v-model="formulario.colonia"
              :error="errores.colonia"
              @update:error="errores.colonia = $event"
              @validacion="validacionCampo('colonia', $event)"
              @blur="alPerderFoco('colonia')"
              label="Colonia"
              placeholder="Nombre de la colonia"
              required
              :validator="validarSoloLetras"
              errorMessage="Por favor ingresa el nombre de la colonia"
            >
              <template #icono>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
              </template>
            </CampoValidado>
          </div>
    
          <!-- Ciudad -->
          <CampoValidado
            id="ciudad"
            v-model="formulario.ciudad"
            :error="errores.ciudad"
            @update:error="errores.ciudad = $event"
            @validacion="validacionCampo('ciudad', $event)"
            @blur="alPerderFoco('ciudad')"
            label="Ciudad"
            placeholder="Tu ciudad"
            required
            soloLetras
            :validator="validarSoloLetras"
            errorMessage="Por favor ingresa una ciudad válida"
          >
            <template #icono>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
            </template>
          </CampoValidado>
    
          <!-- Estado/Provincia -->
          <CampoValidado
            id="estado_provincia"
            v-model="formulario.estado_provincia"
            :error="errores.estado_provincia"
            @update:error="errores.estado_provincia = $event"
            @validacion="validacionCampo('estado_provincia', $event)"
            @blur="alPerderFoco('estado_provincia')"
            label="Estado/Provincia"
            placeholder="Tu estado o provincia"
            required
            soloLetras
            :validator="validarSoloLetras"
            errorMessage="Por favor ingresa un estado o provincia válido"
          >
            <template #icono>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
            </template>
          </CampoValidado>
    
          <!-- Código Postal -->
          <CampoValidado
            id="codigo_postal"
            v-model="formulario.codigo_postal"
            :error="errores.codigo_postal"
            @update:error="errores.codigo_postal = $event"
            @validacion="validacionCampo('codigo_postal', $event)"
            @blur="alPerderFoco('codigo_postal')"
            label="Código Postal"
            placeholder="Tu código postal"
            required
            soloNumeros
            :validator="validarCodigoPostal"
            errorMessage="Por favor ingresa un código postal válido"
          >
            <template #icono>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
            </template>
          </CampoValidado>
    
          <!-- Botones de acción -->
          <div class="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              @click="cancelarEdicion"
              class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition"
            >
              Cancelar
            </button>
            <button
              type="button"
              @click="guardarDirectamente"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center"
              :disabled="cargando"
            >
              <svg v-if="cargando" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ cargando ? 'Guardando...' : 'Guardar Cambios' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted, computed } from 'vue';
  import CampoValidado from '../ui/CampoValidado.vue';
  import { validarSoloLetras, validarEmail, validarTelefono } from '../../utils/validaciones';
  import { useFormulario } from '../../composables/useFormulario';
  import { notificacionStore } from '../stores/notificacion';
  
  const props = defineProps({
    usuario: {
      type: Object,
      default: () => ({})
    }
  });
  
  const emit = defineEmits(['guardar', 'cancelar']);
  
  // Estado para controlar el modo de edición
  const modoEdicion = ref(false);
  
  // Validación para la fecha de nacimiento
  const validarFechaNacimiento = (valor) => {
    if (!valor) return true; // Si está vacío, es válido (no es obligatorio)
    
    const fechaNac = new Date(valor);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNac.getFullYear();
    
    // Verificar que la fecha sea válida y que el usuario sea mayor de 18 años
    return !isNaN(fechaNac.getTime()) && 
           (edad > 18 || (edad === 18 && hoy.getMonth() >= fechaNac.getMonth() && hoy.getDate() >= fechaNac.getDate()));
  };
  
  // En la sección de script, agregar las nuevas validaciones y esquema
  const validarContraseña = (valor) => {
    if (!valor) return false;
    // Mínimo 8 caracteres, al menos una letra mayúscula, una minúscula y un número
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regex.test(valor);
  };
  
  const validarDireccion = (valor) => {
    if (!valor) return false;
    // La dirección debe tener al menos 5 caracteres y no más de 255
    // Debe contener al menos un número y letras
    const regex = /^(?=.*[0-9])(?=.*[a-zA-Z]).{5,255}$/;
    return regex.test(valor);
  };
  
  const validarCodigoPostal = (valor) => {
    if (!valor) return false;
    // Acepta códigos postales de 5 dígitos
    const regex = /^\d{5}$/;
    return regex.test(valor);
  };
  
  // Agregar las nuevas validaciones
  const validarNumero = (valor) => {
    if (!valor) return false;
    return /^\d+$/.test(valor);
  };
  
  // Actualizar el esquema de validación
  const esquemaValidacion = {
    nombre: {
      requerido: true,
      validador: validarSoloLetras,
      mensajes: {
        requerido: 'El nombre es obligatorio',
        validador: 'Por favor ingresa un nombre válido (solo letras)'
      }
    },
    apellidoPaterno: {
      requerido: true,
      validador: validarSoloLetras,
      mensajes: {
        requerido: 'El apellido paterno es obligatorio',
        validador: 'Por favor ingresa un apellido paterno válido (solo letras)'
      }
    },
    apellidoMaterno: {
      requerido: true,
      validador: validarSoloLetras,
      mensajes: {
        requerido: 'El apellido materno es obligatorio',
        validador: 'Por favor ingresa un apellido materno válido (solo letras)'
      }
    },
    correoElectronico: {
      requerido: true,
      validador: validarEmail,
      mensajes: {
        requerido: 'El correo electrónico es obligatorio',
        validador: 'Por favor ingresa un correo electrónico válido'
      }
    },
    contraseña: {
      requerido: true,
      validador: validarContraseña,
      mensajes: {
        requerido: 'La contraseña es obligatoria',
        validador: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número'
      }
    },
    telefono: {
      validador: validarTelefono,
      mensajes: {
        validador: 'Por favor ingresa un número telefónico válido'
      }
    },
    calle: {
      requerido: true,
      validador: validarSoloLetras,
      mensajes: {
        requerido: 'La calle es obligatoria',
        validador: 'Por favor ingresa un nombre de calle válido'
      }
    },
    numero: {
      requerido: true,
      validador: validarNumero,
      mensajes: {
        requerido: 'El número es obligatorio',
        validador: 'Por favor ingresa un número válido'
      }
    },
    colonia: {
      requerido: true,
      validador: validarSoloLetras,
      mensajes: {
        requerido: 'La colonia es obligatoria',
        validador: 'Por favor ingresa un nombre de colonia válido'
      }
    },
    ciudad: {
      requerido: true,
      validador: validarSoloLetras,
      mensajes: {
        requerido: 'La ciudad es obligatoria',
        validador: 'Por favor ingresa una ciudad válida'
      }
    },
    estado_provincia: {
      requerido: true,
      validador: validarSoloLetras,
      mensajes: {
        requerido: 'El estado/provincia es obligatorio',
        validador: 'Por favor ingresa un estado/provincia válido'
      }
    },
    codigo_postal: {
      requerido: true,
      validador: validarCodigoPostal,
      mensajes: {
        requerido: 'El código postal es obligatorio',
        validador: 'Por favor ingresa un código postal válido'
      }
    }
  };
  
  // Actualizar los valores iniciales
  const valoresIniciales = {
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    correoElectronico: '',
    contraseña: '',
    telefono: '',
    calle: '',
    numero: '',
    colonia: '',
    ciudad: '',
    estado_provincia: '',
    codigo_postal: ''
  };
  
  // Usar el hook de formulario
  const {
    formulario,
    errores,
    cargando,
    exito,
    errorGlobal,
    formularioValido,
    validarCampo,
    validarFormulario,
    alPerderFoco,
    resetearFormulario,
    enviarFormulario
  } = useFormulario(esquemaValidacion, valoresIniciales);
  
  // Función para formatear la fecha
  const formatearFecha = (fecha) => {
    if (!fecha) return '';
    
    try {
      const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(fecha).toLocaleDateString('es-ES', opciones);
    } catch (error) {
      console.error('Error al formatear fecha:', error);
      return fecha;
    }
  };
  
  // Función para activar el modo de edición
  const activarModoEdicion = () => {
    console.log("Activando modo edición");
    // Asegurarse de que los datos del formulario estén actualizados
    Object.keys(formulario).forEach(key => {
      if (key in props.usuario) {
        formulario[key] = props.usuario[key];
      }
    });
    modoEdicion.value = true;
  };
  
  // Función para manejar submit del formulario
  const manejarSubmit = (event) => {
    console.log("Formulario enviado");
    event.preventDefault();
    guardarDirectamente();
  };
  
  // Función para guardar directamente
  const guardarDirectamente = async () => {
    try {
      cargando.value = true;
      console.log("Botón guardar presionado directamente");
      
      // Validación manual
      let esValido = true;
      
      // Validar campos requeridos
      if (!formulario.nombre) {
        errores.nombre = 'El nombre es obligatorio';
        esValido = false;
      }
      
      if (!formulario.apellidoPaterno) {
        errores.apellidoPaterno = 'El apellido paterno es obligatorio';
        esValido = false;
      }
      
      if (!formulario.apellidoMaterno) {
        errores.apellidoMaterno = 'El apellido materno es obligatorio';
        esValido = false;
      }
      
      if (!formulario.correoElectronico) {
        errores.correoElectronico = 'El correo electrónico es obligatorio';
        esValido = false;
      } else if (!validarEmail(formulario.correoElectronico)) {
        errores.correoElectronico = 'Por favor ingresa un correo electrónico válido';
        esValido = false;
      }
      
      // Si hay teléfono, validarlo
      if (formulario.telefono && !validarTelefono(formulario.telefono)) {
        errores.telefono = 'Por favor ingresa un número telefónico válido';
        esValido = false;
      }
      
      // Si hay fecha de nacimiento, validarla
      if (formulario.fechaNacimiento && !validarFechaNacimiento(formulario.fechaNacimiento)) {
        errores.fechaNacimiento = 'Por favor ingresa una fecha de nacimiento válida';
        esValido = false;
      }
      
      // Si hay contraseña, validarla
      if (!formulario.contraseña) {
        errores.contraseña = 'La contraseña es obligatoria';
        esValido = false;
      } else if (!validarContraseña(formulario.contraseña)) {
        errores.contraseña = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número';
        esValido = false;
      }
      
      // Validar campos de dirección
      if (!formulario.calle) {
        errores.calle = 'La calle es obligatoria';
        esValido = false;
      }

      if (!formulario.numero) {
        errores.numero = 'El número es obligatorio';
        esValido = false;
      }

      if (!formulario.colonia) {
        errores.colonia = 'La colonia es obligatoria';
        esValido = false;
      }
      
      // Si hay ciudad, validarla
      if (!formulario.ciudad) {
        errores.ciudad = 'La ciudad es obligatoria';
        esValido = false;
      } else if (!validarSoloLetras(formulario.ciudad)) {
        errores.ciudad = 'Por favor ingresa una ciudad válida';
        esValido = false;
      }
      
      // Si hay estado/provincia, validarla
      if (!formulario.estado_provincia) {
        errores.estado_provincia = 'El estado/provincia es obligatorio';
        esValido = false;
      } else if (!validarSoloLetras(formulario.estado_provincia)) {
        errores.estado_provincia = 'Por favor ingresa un estado/provincia válido';
        esValido = false;
      }
      
      // Si hay código postal, validarlo
      if (!formulario.codigo_postal) {
        errores.codigo_postal = 'El código postal es obligatorio';
        esValido = false;
      } else if (!validarCodigoPostal(formulario.codigo_postal)) {
        errores.codigo_postal = 'Por favor ingresa un código postal válido';
        esValido = false;
      }
      
      if (!esValido) {
        console.log("Formulario inválido, no se enviará");
        return;
      }
      
      // Construir la dirección completa
      const direccionCompleta = `${formulario.calle} ${formulario.numero}, ${formulario.colonia}`;

      console.log("Formulario válido, emitiendo evento guardar con datos:", formulario);
      
      // Emitir evento con los datos
      emit('guardar', {
        ...formulario,
        direccion: direccionCompleta,
        id: props.usuario.id || Date.now().toString(),
      });
      
      notificacionStore.mostrar('Perfil actualizado correctamente', 'success');
      cargando.value = false;
      
      // Desactivar modo edición
      modoEdicion.value = false;
      
      console.log("Datos enviados y modo edición desactivado");
    } catch (e) {
      cargando.value = false;
      notificacionStore.mostrar('Error al actualizar el perfil', 'error');
    }
  };
  
  // Función para cancelar la edición
  const cancelarEdicion = () => {
    console.log("Cancelando edición");
    modoEdicion.value = false;
    
    // Resetear el formulario a los valores originales
    Object.keys(formulario).forEach(key => {
      if (key in props.usuario) {
        formulario[key] = props.usuario[key];
      } else {
        formulario[key] = '';
      }
    });
    
    // Limpiar errores
    Object.keys(errores).forEach(key => {
      errores[key] = '';
    });
    
    emit('cancelar');
  };
  
  // Función para manejar la validación de un campo
  const validacionCampo = (campo, esValido) => {
    console.log(`Campo ${campo} validado: ${esValido}`);
  };
  
  // Al montar el componente, inicializamos los valores del formulario con los datos del usuario
  onMounted(() => {
    console.log("Componente FormularioPerfil montado, usuario:", props.usuario);
    
    if (props.usuario) {
      // Asignar valores del usuario al formulario
      Object.keys(formulario).forEach(key => {
        if (key in props.usuario) {
          formulario[key] = props.usuario[key];
        }
      });
    }
  });

  const avatarUrl = computed(() => {
    // Si en el futuro hay un campo usuario.foto, usarlo
    if (props.usuario && props.usuario.foto) {
      return props.usuario.foto;
    }
    // Si no, generar el avatar con nombre y apellidos
    const nombre = props.usuario?.nombre || '';
    const apellido = props.usuario?.apellidoPaterno || '';
    const apellidos = apellido + ' ' + (props.usuario?.apellidoMaterno || '');
    const fullName = encodeURIComponent((nombre + ' ' + apellidos).trim());
    return `https://ui-avatars.com/api/?name=${fullName}&background=random&color=fff&size=128`;
  });
  </script>