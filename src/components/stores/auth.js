// src/components/stores/auth.js
import { defineStore } from 'pinia';
import axios from '../../axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || 'null'),
    token: localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token') || null,
    loading: false,
    error: null
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.token,
    isLoading: (state) => state.loading
  },
  
  actions: {
    async login(credentials) {
      this.loading = true;
      this.error = null;
      
      try {
        // Llamada al backend
        const response = await axios.post('/api/auth/login', {
          correoElectronico: credentials.email,
          contraseña: credentials.password
        });

        const { token, usuario } = response.data;

        // Guarda en storage según la preferencia de "recordarme"
        if (credentials.remember) {
          localStorage.setItem('auth_token', token);
          localStorage.setItem('user', JSON.stringify(usuario));
        } else {
          sessionStorage.setItem('auth_token', token);
          sessionStorage.setItem('user', JSON.stringify(usuario));
        }

        // Actualiza el estado
        this.token = token;
        this.user = usuario;

        // Configura el token para futuras peticiones
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        return usuario;
      } catch (error) {
        this.error = error.response?.data?.message || 'Error al iniciar sesión. Por favor intenta nuevamente.';
        return null;
      } finally {
        this.loading = false;
      }
    },
    
    logout() {
      this.user = null;
      this.token = null;
      
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      sessionStorage.removeItem('auth_token');
      sessionStorage.removeItem('user');
      
      delete axios.defaults.headers.common['Authorization'];
    },
    
    async fetchUser() {
      if (!this.token) return null;
      this.loading = true;
      try {
        // Asegura que el token esté en el header antes de la petición
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        const response = await axios.get('/api/auth/me');
        this.user = response.data.user || response.data;
        // Actualiza el storage también
        localStorage.setItem('user', JSON.stringify(this.user));
        sessionStorage.setItem('user', JSON.stringify(this.user));
        return this.user;
      } catch (error) {
        this.logout();
        throw new Error('Sesión expirada. Por favor inicia sesión nuevamente.');
      } finally {
        this.loading = false;
      }
    }
  }
});