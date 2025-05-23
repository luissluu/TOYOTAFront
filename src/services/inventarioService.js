import axios from 'axios';
import { endpoints } from '@/config/api';

const API_URL = endpoints.inventario;

export const inventarioService = {
    // Obtener todos los artículos
    getAllArticulos: async () => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error('Error en getAllArticulos:', error);
            throw error;
        }
    },

    // Obtener artículos por categoría
    getArticulosByCategoria: async (categoria) => {
        try {
            const response = await axios.get(`${API_URL}/categoria/${categoria}`);
            return response.data;
        } catch (error) {
            console.error('Error en getArticulosByCategoria:', error);
            throw error;
        }
    },

    // Crear nuevo artículo
    createArticulo: async (articulo) => {
        try {
            const response = await axios.post(API_URL, articulo);
            return response.data;
        } catch (error) {
            console.error('Error en createArticulo:', error);
            throw error;
        }
    },

    // Actualizar artículo
    updateArticulo: async (id, articulo) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, articulo);
            return response.data;
        } catch (error) {
            console.error('Error en updateArticulo:', error);
            throw error;
        }
    },

    // Eliminar artículo
    deleteArticulo: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en deleteArticulo:', error);
            throw error;
        }
    },

    // Actualizar stock
    updateStock: async (id, cantidad) => {
        try {
            const response = await axios.patch(`${API_URL}/${id}/stock`, { cantidad });
            return response.data;
        } catch (error) {
            console.error('Error en updateStock:', error);
            throw error;
        }
    }
}; 