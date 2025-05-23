// src/main.js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import "./assets/app.css";
import axios from './axios'; // o la ruta correcta

const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
// Crear la aplicación
const app = createApp(App);

// Registrar Pinia para la gestión de estados
app.use(createPinia());

// Registrar el enrutador
app.use(router);

// Montar la aplicación
app.mount('#app');