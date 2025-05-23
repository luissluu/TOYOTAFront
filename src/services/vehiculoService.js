const API_URL = import.meta.env.VITE_API_URL + '/api/vehiculos';

// Obtener todos los vehículos
export async function getVehiculos(token) {
  const res = await fetch(API_URL, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Error al obtener vehículos');
  return res.json();
}

// Obtener un vehículo por ID
export async function getVehiculoById(id, token) {
  const res = await fetch(`${API_URL}/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Error al obtener vehículo');
  return res.json();
}

// Crear un vehículo
export async function createVehiculo(data, token) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al crear vehículo');
  return res.json();
}

// Actualizar un vehículo
export async function updateVehiculo(id, data, token) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al actualizar vehículo');
  return res.json();
}

// Eliminar un vehículo
export async function deleteVehiculo(id, token) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Error al eliminar vehículo');
  return res.json();
} 