const API_URL = import.meta.env.VITE_API_URL + '/api/usuarios';

export async function registerUsuario(data) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al registrar usuario');
  return res.json();
} 