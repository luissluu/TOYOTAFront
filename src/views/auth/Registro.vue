<!-- src/views/auth/Registro.vue -->
<template>
  <div class="min-h-screen bg-gray-800 flex flex-col items-center justify-center px-4 py-12">
    <div 
      class="absolute inset-0 opacity-10 pointer-events-none bg-cover bg-center" 
      style="background-image: url('/Images/toyota-fondo.webp'); background-blend-mode: overlay;"
    ></div>
    <div 
      class="w-full max-w-4xl bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden relative z-10"
    >
      <div class="md:flex">
        <div class="md:w-1/2 hidden md:block relative">
          <div 
            class="absolute inset-0 bg-cover bg-center" 
            style="background-image: url('/Images/Logo.png');"
          ></div>
          <div class="absolute inset-0 bg-gradient-to-tr from-[#EB0A1E]/80 to-black/70"></div>
          <div class="absolute bottom-0 left-0 p-8 text-white">
            <h2 class="text-2xl font-bold">Únete a la comunidad Toyota</h2>
            <p class="mt-2 text-sm opacity-80">Regístrate para acceder a todos nuestros servicios.</p>
          </div>
        </div>
        <div class="md:w-1/2 p-6 md:p-8 flex items-center justify-center">
          <div class="w-full max-w-md">
            <!-- Logo y encabezado -->
            <div class="text-center mb-8">
              <div class="inline-flex items-center justify-center p-2 bg-red-600 rounded-full mb-4">
                <svg class="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM7 13.5C7 13.22 7.22 13 7.5 13H16.5C16.78 13 17 13.22 17 13.5V14.5C17 14.78 16.78 15 16.5 15H7.5C7.22 15 7 14.78 7 14.5V13.5ZM16.5 11H7.5C7.22 11 7 10.78 7 10.5V9.5C7 9.22 7.22 9 7.5 9H16.5C16.78 9 17 9.22 17 9.5V10.5C17 10.78 16.78 11 16.5 11Z" fill="currentColor"/>
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-gray-900">Toyota</h2>
              <p class="text-sm text-gray-600 mt-1">
                Soluciones de movilidad para todos
              </p>
            </div>
            
            <!-- Contenedor del formulario -->
            <div class="bg-white p-8 shadow-lg rounded-lg border border-gray-100">
              <h3 class="text-xl font-bold text-gray-900 mb-6">
                Crear Cuenta
              </h3>
              
              <!-- Formulario -->
              <form @submit.prevent="handleRegister" class="space-y-6">
                <!-- Nombre -->
                <CampoValidado
                  id="nombre"
                  v-model="formulario.nombre"
                  :error="errores.nombre"
                  @update:error="errores.nombre = $event"
                  @validacion="validacionCampo('nombre', $event)"
                  @blur="alPerderFoco('nombre')"
                  label="Nombre"
                  placeholder="Ingresa tu Nombre"
                  required
                  soloLetras
                  :validator="validarNombre"
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
                  :validator="validarNombre"
                  errorMessage="Por favor ingresa un apellido válido (solo letras)"
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
                  :validator="validarNombre"
                  errorMessage="Por favor ingresa un apellido válido (solo letras)"
                >
                  <template #icono>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                    </svg>
                  </template>
                </CampoValidado>

                <!-- Correo -->
                <CampoValidado
                  id="email"
                  type="email"
                  v-model="formulario.email"
                  :error="errores.email"
                  @update:error="errores.email = $event"
                  @validacion="validacionCampo('email', $event)"
                  @blur="alPerderFoco('email')"
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
                  placeholder="Tu teléfono"
                  required
                  :validator="(valor) => /^\d{10,15}$/.test(valor)"
                  errorMessage="Por favor ingresa un teléfono válido (10 a 15 dígitos)"
                >
                  <template #icono>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </template>
                </CampoValidado>

                <!-- Fecha de Nacimiento -->
                <CampoValidado
                  id="fecha_nacimiento"
                  type="date"
                  v-model="formulario.fecha_nacimiento"
                  :error="errores.fecha_nacimiento"
                  @update:error="errores.fecha_nacimiento = $event"
                  @validacion="validacionCampo('fecha_nacimiento', $event)"
                  @blur="alPerderFoco('fecha_nacimiento')"
                  label="Fecha de Nacimiento"
                  required
                  :validator="validarFechaNacimiento"
                  errorMessage="Por favor ingresa una fecha de nacimiento válida"
                >
                  <template #icono>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                    </svg>
                  </template>
                </CampoValidado>

                <!-- Dirección -->
                <div class="space-y-2">
                  <div class="font-semibold text-gray-700 mt-2 mb-1">Dirección</div>
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
                    :validator="(valor) => valor && valor.length > 2"
                    errorMessage="Por favor ingresa la calle"
                  />
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
                    :validator="(valor) => /^\d+$/.test(valor)"
                    errorMessage="Por favor ingresa el número"
                  />
                  <!-- Colonia -->
                  <CampoValidado
                    id="colonia"
                    v-model="formulario.colonia"
                    :error="errores.colonia"
                    @update:error="errores.colonia = $event"
                    @validacion="validacionCampo('colonia', $event)"
                    @blur="alPerderFoco('colonia')"
                    label="Colonia"
                    placeholder="Colonia"
                    required
                    :validator="(valor) => valor && valor.length > 2"
                    errorMessage="Por favor ingresa la colonia"
                  />
                  <!-- Ciudad -->
                  <CampoValidado
                    id="ciudad"
                    v-model="formulario.ciudad"
                    :error="errores.ciudad"
                    @update:error="errores.ciudad = $event"
                    @validacion="validacionCampo('ciudad', $event)"
                    @blur="alPerderFoco('ciudad')"
                    label="Ciudad"
                    placeholder="Ciudad"
                    required
                    :validator="(valor) => valor && valor.length > 2"
                    errorMessage="Por favor ingresa la ciudad"
                  />
                  <!-- Estado/Provincia -->
                  <CampoValidado
                    id="estado_provincia"
                    v-model="formulario.estado_provincia"
                    :error="errores.estado_provincia"
                    @update:error="errores.estado_provincia = $event"
                    @validacion="validacionCampo('estado_provincia', $event)"
                    @blur="alPerderFoco('estado_provincia')"
                    label="Estado/Provincia"
                    placeholder="Estado o provincia"
                    required
                    :validator="(valor) => valor && valor.length > 2"
                    errorMessage="Por favor ingresa el estado o provincia"
                  />
                  <!-- Código Postal -->
                  <CampoValidado
                    id="codigo_postal"
                    v-model="formulario.codigo_postal"
                    :error="errores.codigo_postal"
                    @update:error="errores.codigo_postal = $event"
                    @validacion="validacionCampo('codigo_postal', $event)"
                    @blur="alPerderFoco('codigo_postal')"
                    label="Código Postal"
                    placeholder="Código postal"
                    required
                    :validator="(valor) => /^\d{4,10}$/.test(valor)"
                    errorMessage="Por favor ingresa un código postal válido"
                  />
                </div>

                <!-- Contraseña -->
                <CampoValidado
                  id="password"
                  type="password"
                  v-model="formulario.password"
                  :error="errores.password"
                  @update:error="errores.password = $event"
                  @validacion="validacionCampo('password', $event)"
                  @blur="alPerderFoco('password')"
                  label="Contraseña"
                  placeholder="••••••••"
                  required
                  :validator="validarPassword"
                  errorMessage="Debe tener al menos 8 caracteres, incluyendo mayúscula, minúscula y un número"
                  autocomplete="new-password"
                  ayuda="Mínimo 8 caracteres, una mayúscula, una minúscula y un número"
                >
                  <template #icono>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                    </svg>
                  </template>
                </CampoValidado>

                <!-- Confirmar Contraseña -->
                <CampoValidado
                  id="passwordConfirm"
                  type="password"
                  v-model="formulario.passwordConfirm"
                  :error="errores.passwordConfirm"
                  @update:error="errores.passwordConfirm = $event"
                  @validacion="validacionCampo('passwordConfirm', $event)"
                  @blur="alPerderFoco('passwordConfirm')"
                  label="Confirmar Contraseña"
                  placeholder="••••••••"
                  required
                  :validator="(valor) => validarConfirmacionPassword(valor, formulario.password)"
                  errorMessage="Las contraseñas no coinciden"
                  autocomplete="new-password"
                >
                  <template #icono>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                    </svg>
                  </template>
                </CampoValidado>

                <!-- Mensaje de error global -->
                <div v-if="errorGlobal" class="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                  {{ errorGlobal }}
                </div>

                <!-- Botón de registro -->
                <div>
                  <button
                    type="submit"
                    class="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    :disabled="cargando"
                  >
                    <svg v-if="cargando" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {{ cargando ? 'Creando cuenta...' : 'Registrarse' }}
                  </button>
                </div>

                <!-- Enlace para iniciar sesión -->
                <div class="text-center">
                  <p class="text-sm text-gray-600">
                    ¿Ya tienes una cuenta?
                    <router-link
                      to="/login"
                      class="font-medium text-blue-600 hover:text-blue-700"
                    >
                      Inicia Sesión
                    </router-link>
                  </p>
                </div>
              </form>
            </div>
            
            <!-- Pie de página -->
            <div class="text-center mt-6 text-xs text-gray-500">
              &copy; {{ new Date().getFullYear() }} Toyota. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import CampoValidado from '../../components/ui/CampoValidado.vue';
import { validarSoloLetras, validarEmail, validarPassword, validarPasswordsCoinciden } from '../../utils/validaciones';
import { useFormulario } from '../../composables/useFormulario';
import { usuarioService } from '../../services/usuarioService';

const router = useRouter();

// Coloca la función de validación ANTES del esquema de validación
const validarFechaNacimiento = (valor) => {
  if (!valor) return false;
  const fecha = new Date(valor);
  const hoy = new Date();
  const edadMinima = 18;
  const edadMaxima = 100;
  if (isNaN(fecha.getTime())) return false;
  let edad = hoy.getFullYear() - fecha.getFullYear();
  const m = hoy.getMonth() - fecha.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < fecha.getDate())) {
    edad--;
  }
  return edad >= edadMinima && edad <= edadMaxima;
};

// Esquema de validación del formulario
const esquemaValidacion = {
  nombre: {
    requerido: true,
    validador: validarSoloLetras,
    validarInmediato: true,
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
      validador: 'Por favor ingresa un apellido válido (solo letras)'
    }
  },
  apellidoMaterno: {
    requerido: true,
    validador: validarSoloLetras,
    mensajes: {
      requerido: 'El apellido materno es obligatorio',
      validador: 'Por favor ingresa un apellido válido (solo letras)'
    }
  },
  email: {
    requerido: true,
    validador: validarEmail,
    mensajes: {
      requerido: 'El correo electrónico es obligatorio',
      validador: 'Por favor ingresa un correo electrónico válido'
    }
  },
  telefono: {
    requerido: true,
    validador: valor => /^\d{10,15}$/.test(valor),
    mensajes: {
      requerido: 'El teléfono es obligatorio',
      validador: 'Por favor ingresa un teléfono válido (10 a 15 dígitos)'
    }
  },
  calle: {
    requerido: true,
    validador: valor => valor && valor.length > 2,
    mensajes: {
      requerido: 'La calle es obligatoria',
      validador: 'Por favor ingresa la calle'
    }
  },
  numero: {
    requerido: true,
    validador: valor => /^\d+$/.test(valor),
    mensajes: {
      requerido: 'El número es obligatorio',
      validador: 'Por favor ingresa el número'
    }
  },
  colonia: {
    requerido: true,
    validador: valor => valor && valor.length > 2,
    mensajes: {
      requerido: 'La colonia es obligatoria',
      validador: 'Por favor ingresa la colonia'
    }
  },
  ciudad: {
    requerido: true,
    validador: valor => valor && valor.length > 2,
    mensajes: {
      requerido: 'La ciudad es obligatoria',
      validador: 'Por favor ingresa la ciudad'
    }
  },
  estado_provincia: {
    requerido: true,
    validador: valor => valor && valor.length > 2,
    mensajes: {
      requerido: 'El estado/provincia es obligatorio',
      validador: 'Por favor ingresa el estado o provincia'
    }
  },
  codigo_postal: {
    requerido: true,
    validador: valor => /^\d{4,10}$/.test(valor),
    mensajes: {
      requerido: 'El código postal es obligatorio',
      validador: 'Por favor ingresa un código postal válido'
    }
  },
  password: {
    requerido: true,
    validador: validarPassword,
    mensajes: {
      requerido: 'La contraseña es obligatoria',
      validador: 'Debe tener al menos 8 caracteres, incluyendo mayúscula, minúscula y un número'
    }
  },
  passwordConfirm: {
    requerido: true,
    validador: (valor, form) => validarPasswordsCoinciden(valor, form.password),
    mensajes: {
      requerido: 'Por favor, confirma tu contraseña',
      validador: 'Las contraseñas no coinciden'
    }
  },
  fecha_nacimiento: {
    requerido: true,
    validador: validarFechaNacimiento,
    mensajes: {
      requerido: 'La fecha de nacimiento es obligatoria',
      validador: 'Debes tener entre 18 y 100 años'
    }
  },
};

// Valores iniciales del formulario
const valoresIniciales = {
  nombre: '',
  apellidoPaterno: '',
  apellidoMaterno: '',
  email: '',
  telefono: '',
  calle: '',
  numero: '',
  colonia: '',
  ciudad: '',
  estado_provincia: '',
  codigo_postal: '',
  password: '',
  passwordConfirm: '',
  fecha_nacimiento: '',
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

// Funciones de validación adicionales para usar en los componentes
const validarNombre = (valor) => {
  return validarSoloLetras(valor);
};

const validarConfirmacionPassword = (confirmacion, original) => {
  return validarPasswordsCoinciden(confirmacion, original);
};

// Función para manejar la validación de un campo
const validacionCampo = (campo, esValido) => {
  // Puedes hacer algo adicional aquí si es necesario
  console.log(`Campo ${campo} validado: ${esValido}`);
};

// Función para manejar el registro
const handleRegister = async () => {
  try {
    // Construir la dirección completa
    const direccionCompleta = `${formulario.calle} ${formulario.numero}, ${formulario.colonia}`;
    
    const datosRegistro = {
      nombre: formulario.nombre,
      apellidoPaterno: formulario.apellidoPaterno,
      apellidoMaterno: formulario.apellidoMaterno,
      correoElectronico: formulario.email,
      telefono: formulario.telefono,
      fecha_nacimiento: formulario.fecha_nacimiento,
      direccion: direccionCompleta,
      ciudad: formulario.ciudad,
      estado_provincia: formulario.estado_provincia,
      codigo_postal: formulario.codigo_postal,
      contraseña: formulario.password,
      rol_id: 3 // Cliente por defecto
    };
    const res = await usuarioService.crearUsuario(datosRegistro);
    exito.value = res.message;
    router.push('/login');
    return true;
  } catch (error) {
    // Mostrar mensaje del backend si existe
    if (error.response && error.response.data && error.response.data.message) {
      errorGlobal.value = error.response.data.message;
    } else if (error.message) {
      errorGlobal.value = error.message;
    } else {
      errorGlobal.value = 'Ha ocurrido un error al registrarse. Por favor, intenta más tarde.';
    }
    throw new Error(errorGlobal.value);
  }
};

// Observar cambios importantes en el formulario
watch(
  [() => formulario.password, () => formulario.passwordConfirm],
  ([nuevaPassword, nuevaConfirmacion]) => {
    // Si tenemos ambos valores, validamos la confirmación
    if (nuevaPassword && nuevaConfirmacion) {
      validarCampo('passwordConfirm');
    }
  }
);
</script>