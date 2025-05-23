<template>
  <transition name="toast-fade">
    <div v-if="visible" :class="['toast', tipo]">
      <span class="icon">
        <svg v-if="tipo === 'success'" class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
        <svg v-else-if="tipo === 'error'" class="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        <svg v-else class="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01" /></svg>
      </span>
      <span class="mensaje">{{ mensaje }}</span>
      <button class="cerrar" @click="cerrar">&times;</button>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
const props = defineProps({
  mensaje: { type: String, required: true },
  tipo: { type: String, default: 'info' }
});
const visible = ref(true);
const cerrar = () => { visible.value = false; };
onMounted(() => { setTimeout(cerrar, 3000); });
watch(() => props.mensaje, () => { visible.value = true; setTimeout(cerrar, 3000); });
</script>

<style scoped>
.toast {
  display: flex;
  align-items: center;
  min-width: 250px;
  max-width: 350px;
  background: #23272f;
  color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.15);
  padding: 1rem 1.5rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  animation: fade-in-up 0.4s;
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 9999;
}
.toast.success { border-left: 5px solid #22c55e; }
.toast.error { border-left: 5px solid #ef4444; }
.toast.info { border-left: 5px solid #3b82f6; }
.icon { margin-right: 0.75rem; display: flex; align-items: center; }
.mensaje { flex: 1; }
.cerrar {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  margin-left: 0.5rem;
}
.toast-fade-enter-active, .toast-fade-leave-active { transition: opacity 0.4s, transform 0.4s; }
.toast-fade-enter-from, .toast-fade-leave-to { opacity: 0; transform: translateY(30px); }
@keyframes fade-in-up {
  0% { opacity: 0; transform: translateY(40px); }
  100% { opacity: 1; transform: translateY(0); }
}
</style> 