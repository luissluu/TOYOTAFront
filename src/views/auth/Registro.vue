<!-- src/views/auth/Registro.vue -->
<template>
  <div class="min-h-screen bg-gray-800 flex flex-col items-center justify-center px-4 py-12">
    <div class="w-full max-w-4xl bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden relative z-10">
      <div class="md:flex">
        <!-- MITAD IZQUIERDA CON FONDO Y LOGO -->
        <div class="md:w-1/2 hidden md:block relative">
          <div 
            class="absolute inset-0 bg-cover bg-center"
            style="background-image: url('/Images/toyota-fondo.webp'); background-blend-mode: overlay; opacity: 0.15;"
          ></div>
          <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('/Images/Logo.png');"></div>
          <div class="absolute inset-0 bg-gradient-to-tr from-[#EB0A1E]/80 to-black/70"></div>
          <div class="absolute bottom-0 left-0 p-8 text-white z-10">
            <h2 class="text-2xl font-bold">Únete a la comunidad Toyota</h2>
            <p class="mt-2 text-sm opacity-80">Regístrate para acceder a todos nuestros servicios.</p>
          </div>
        </div>
        <!-- MITAD DERECHA: FORMULARIO -->
        <div class="md:w-1/2 p-6 md:p-8 flex items-center justify-center">
          <div class="w-full max-w-md">
            <slot />
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
import { registerUsuario } from '../../services/usuarioService';

const router = useRouter();

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
  }
};

// Valores iniciales del formulario
const valoresIniciales = {
  nombre: '',
  apellidoPaterno: '',
  apellidoMaterno: '',
  email: '',
  password: '',
  passwordConfirm: ''
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
  console.log('Intentando registrar...');
  try {
    const datosRegistro = {
      nombre: formulario.nombre,
      apellidoPaterno: formulario.apellidoPaterno,
      apellidoMaterno: formulario.apellidoMaterno,
      correoElectronico: formulario.email,
      contraseña: formulario.password,
      rol_id: 3 // Cliente por defecto
    };
    const res = await registerUsuario(datosRegistro);
    exito.value = res.message;
    router.push('/login');
    return true;
  } catch (error) {
    errorGlobal.value = error.message;
    throw new Error('Ha ocurrido un error al registrarse. Por favor, intenta más tarde.');
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