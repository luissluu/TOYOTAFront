const API_URL = import.meta.env.VITE_API_URL + '/auth/login';

export async function loginUsuario(data) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Credenciales inválidas');
  return res.json();
}
