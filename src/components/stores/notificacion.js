import { reactive } from 'vue';

const state = reactive({
  visible: false,
  mensaje: '',
  tipo: 'info',
});

function mostrar(mensaje, tipo = 'info') {
  state.mensaje = mensaje;
  state.tipo = tipo;
  state.visible = true;
  setTimeout(() => { state.visible = false; }, 3000);
}

export const notificacionStore = {
  state,
  mostrar,
}; 