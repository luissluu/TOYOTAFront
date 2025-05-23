import axios from '../axios';

export const usuarioService = {
  // Obtener todos los usuarios
  getUsuarios: async () => {
    try {
      const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
      const response = await axios.get('/api/usuarios', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw error.response?.data || error.message;
    }
  },

  // Obtener un usuario por ID
  getUsuarioById: async (id) => {
    try {
      const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
      const response = await axios.get(`/api/usuarios/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      throw error.response?.data || error.message;
    }
  },

  // Crear un nuevo usuario
  crearUsuario: async (usuario) => {
    try {
      const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
      const response = await axios.post('/api/usuarios', usuario, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw error.response?.data || error.message;
    }
  },

  // Actualizar un usuario
  actualizarUsuario: async (id, usuario) => {
    try {
      const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
      const response = await axios.put(`/api/usuarios/${id}`, usuario, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      throw error.response?.data || error.message;
    }
  },

  // Eliminar un usuario
  eliminarUsuario: async (id) => {
    try {
      const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
      const response = await axios.delete(`/api/usuarios/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      throw error.response?.data || error.message;
    }
  }
}; 