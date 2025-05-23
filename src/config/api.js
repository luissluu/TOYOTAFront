const API_URL = import.meta.env.VITE_API_URL || 'https://toyotaback.onrender.com';

export const endpoints = {
    inventario: `${API_URL}/api/inventario`,
    auth: `${API_URL}/api/auth`,
    usuarios: `${API_URL}/api/usuarios`,
    vehiculos: `${API_URL}/api/vehiculos`,
    servicios: `${API_URL}/api/servicios`,
    citas: `${API_URL}/api/citas`,
    ordenes: `${API_URL}/api/ordenes-servicio`,
    pedidos: `${API_URL}/api/pedidos`,
    movimientos: `${API_URL}/api/movimientos-inventario`
}; 