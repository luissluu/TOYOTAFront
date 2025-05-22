const API_URL = import.meta.env.VITE_API_URL + '/api/servicios';

// Obtener todos los servicios
export async function getServicios() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error al obtener servicios');
  return res.json();
} 