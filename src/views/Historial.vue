<template>
  <div class="flex flex-col w-full px-6">
    <section class="grid grid-cols-1 gap-8 px-8 md:grid-cols-1">
      <div class="bg-gray-800 md:col-span-1">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold tracking-tight text-white">Historial de Servicios</h2>
            <div class="flex items-center space-x-4">
              <div class="relative">
                <input 
                  type="text" 
                  v-model="busqueda" 
                  placeholder="Buscar en historial..." 
                  class="w-64 rounded-md bg-gray-600 border-gray-500 text-white px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <svg class="absolute left-3 top-3 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Filtros -->
          <div class="flex flex-wrap gap-4 mb-6">
            <select 
              v-model="filtroEstado" 
              class="rounded-md bg-gray-600 border-gray-500 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option v-for="estado in estadosDisponibles" :key="estado.value" :value="estado.value">{{ estado.label }}</option>
            </select>
          </div>
          
          <!-- Estado de carga y error -->
          <div v-if="cargando" class="flex justify-center items-center py-8">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>

          <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong class="font-bold">Error:</strong>
            <span class="block sm:inline">{{ error }}</span>
          </div>

          <!-- Tabla de historial de servicios -->
          <div v-else class="bg-gray-700 rounded-lg overflow-hidden">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-600">
                <thead class="bg-gray-800">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Servicio</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Fecha</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Precio</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Estado</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody class="bg-gray-700 divide-y divide-gray-600">
                  <tr v-if="serviciosFiltrados.length === 0" class="hover:bg-gray-600 transition-colors duration-200">
                    <td colspan="6" class="px-6 py-4 text-center text-sm text-gray-400">
                      No se encontraron servicios
                    </td>
                  </tr>
                  <tr v-for="servicio in serviciosFiltrados" :key="servicio.id" class="hover:bg-gray-600 transition-colors duration-200">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">#{{ servicio.id }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">{{ servicio.tipo }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">{{ servicio.fecha }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">${{ servicio.precio }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="badgeEstado(servicio.estado)">{{ servicio.estado }}</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div class="flex space-x-3">
                        <button 
                          @click="verDetalles(servicio)" 
                          class="text-gray-400 hover:text-gray-300 transition-colors duration-200 relative group"
                          aria-label="Ver detalles"
                        >
                          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 rounded bg-gray-900 text-xs text-white opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">Ver detalles</span>
                        </button>
                        <button 
                          @click="generarPDF(servicio)" 
                          class="text-blue-400 hover:text-blue-300 transition-colors duration-200 relative group"
                          aria-label="Generar PDF"
                        >
                          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          <span class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 rounded bg-gray-900 text-xs text-white opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">Generar PDF</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- Paginación -->
            <div v-if="serviciosFiltrados.length > 0" class="bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-700 sm:px-6">
              <div class="flex-1 flex justify-between sm:hidden">
                <button 
                  @click="cambiarPagina(paginacion.paginaActual - 1)"
                  :disabled="paginacion.paginaActual === 1"
                  class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Anterior
                </button>
                <button 
                  @click="cambiarPagina(paginacion.paginaActual + 1)"
                  :disabled="paginacion.paginaActual === paginacion.totalPaginas"
                  class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Siguiente
                </button>
              </div>
              <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p class="text-sm text-gray-400">
                    Mostrando
                    <span class="font-medium">{{ paginacion.desde }}</span>
                    a
                    <span class="font-medium">{{ paginacion.hasta }}</span>
                    de
                    <span class="font-medium">{{ paginacion.total }}</span>
                    resultados
                  </p>
                </div>
                <div>
                  <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button 
                      @click="cambiarPagina(paginacion.paginaActual - 1)"
                      :disabled="paginacion.paginaActual === 1"
                      class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-600 bg-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span class="sr-only">Anterior</span>
                      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </button>
                    <button 
                      v-for="pagina in paginacion.totalPaginas" 
                      :key="pagina"
                      @click="cambiarPagina(pagina)"
                      :class="[
                        'relative inline-flex items-center px-4 py-2 border border-gray-600 text-sm font-medium',
                        pagina === paginacion.paginaActual 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      ]"
                    >
                      {{ pagina }}
                    </button>
                    <button 
                      @click="cambiarPagina(paginacion.paginaActual + 1)"
                      :disabled="paginacion.paginaActual === paginacion.totalPaginas"
                      class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-600 bg-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span class="sr-only">Siguiente</span>
                      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Resumen de estadísticas -->
          <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="bg-gray-700 p-4 rounded-xl shadow flex items-center gap-4 hover:scale-105 hover:shadow-lg transition-all duration-300 border border-gray-600">
              <div class="flex-shrink-0 bg-blue-500 rounded-lg h-12 w-12 flex items-center justify-center">
                <svg class="h-7 w-7 text-white" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.07-7.07l-1.41 1.41M6.34 17.66l-1.41 1.41m12.02 0l-1.41-1.41M6.34 6.34L4.93 4.93"/>
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-300">Total Gastado</p>
                <p class="text-xl font-bold text-white">{{ estadisticas.totalGastado }}</p>
              </div>
            </div>
            <div class="bg-gray-700 p-4 rounded-xl shadow flex items-center gap-4 hover:scale-105 hover:shadow-lg transition-all duration-300 border border-gray-600">
              <div class="flex-shrink-0 bg-yellow-400 rounded-lg h-12 w-12 flex items-center justify-center">
                <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-white">Abiertas</p>
                <p class="text-xl font-bold text-white">{{ estadisticas.abiertas }}</p>
              </div>
            </div>
            <div class="bg-gray-700 p-4 rounded-xl shadow flex items-center gap-4 hover:scale-105 hover:shadow-lg transition-all duration-300 border border-gray-600">
              <div class="flex-shrink-0 bg-blue-400 rounded-lg h-12 w-12 flex items-center justify-center">
                <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-white">En Progreso</p>
                <p class="text-xl font-bold text-white">{{ estadisticas.enProceso }}</p>
              </div>
            </div>
            <div class="bg-gray-700 p-4 rounded-xl shadow flex items-center gap-4 hover:scale-105 hover:shadow-lg transition-all duration-300 border border-gray-600">
              <div class="flex-shrink-0 bg-green-500 rounded-lg h-12 w-12 flex items-center justify-center">
                <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-white">Servicios Completados</p>
                <p class="text-xl font-bold text-white">{{ estadisticas.finalizadas }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal de detalles del servicio -->
    <div v-if="mostrarDetalles" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="absolute inset-0 bg-black opacity-50" @click="mostrarDetalles = false"></div>
      <div class="relative bg-gray-800 max-w-4xl w-full mx-auto rounded-lg shadow-lg p-6">
        <button @click="mostrarDetalles = false" class="absolute top-4 right-4 text-gray-400 hover:text-white">
          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div v-if="servicioDetalle" class="space-y-6">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-xl font-medium text-white">Detalles del Servicio #{{ servicioDetalle.id }}</h3>
              <p class="text-gray-400 mt-1">{{ servicioDetalle.fecha }}</p>
            </div>
            <span :class="badgeEstado(servicioDetalle.estado)">{{ servicioDetalle.estado }}</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-gray-700 p-4 rounded-lg">
              <h4 class="text-lg font-medium text-white mb-3">Información del Cliente</h4>
              <div class="space-y-2">
                <p class="text-gray-300">
                  <span class="text-gray-400">Nombre:</span> {{ servicioDetalle.cliente?.nombre || 'No disponible' }}
                </p>
                <p class="text-gray-300">
                  <span class="text-gray-400">Teléfono:</span> {{ servicioDetalle.cliente?.telefono || 'No disponible' }}
                </p>
                <p class="text-gray-300">
                  <span class="text-gray-400">Email:</span> {{ servicioDetalle.cliente?.correoElectronico || 'No disponible' }}
                </p>
              </div>
            </div>
            <div class="bg-gray-700 p-4 rounded-lg">
              <h4 class="text-lg font-medium text-white mb-3">Información del Vehículo</h4>
              <div class="space-y-2">
                <p class="text-gray-300">
                  <span class="text-gray-400">Modelo:</span> {{ servicioDetalle.vehiculo?.modelo || 'No disponible' }}
                </p>
                <p class="text-gray-300">
                  <span class="text-gray-400">Placa:</span> {{ servicioDetalle.vehiculo?.placa || 'No disponible' }}
                </p>
                <p class="text-gray-300">
                  <span class="text-gray-400">Año:</span> {{ servicioDetalle.vehiculo?.anio || 'No disponible' }}
                </p>
              </div>
            </div>
          </div>
          <div class="bg-gray-700 p-4 rounded-lg">
            <h4 class="text-lg font-medium text-white mb-3">Servicios de la Orden</h4>
            <div v-if="servicioDetalle.detalles && servicioDetalle.detalles.length" class="space-y-4">
              <div v-for="(detalle, idx) in servicioDetalle.detalles" :key="idx" class="border-b border-gray-600 pb-2 mb-2 last:border-b-0 last:mb-0">
                <p class="text-gray-300"><span class="text-gray-400">Servicio:</span> {{ detalle.nombre_servicio || detalle.nombre || 'Sin nombre' }}</p>
                <p class="text-gray-300"><span class="text-gray-400">Descripción:</span> {{ detalle.descripcion || 'Sin descripción' }}</p>
                <p class="text-gray-300"><span class="text-gray-400">Precio:</span> ${{ detalle.precio || detalle.precio_estimado || '0' }}</p>
              </div>
            </div>
            <div v-else class="text-gray-400 text-sm">Sin servicios asociados.</div>
          </div>
          <div class="bg-gray-700 p-4 rounded-lg">
            <h4 class="text-lg font-medium text-white mb-3">Historial de Actualizaciones</h4>
            <div class="space-y-4">
              <div v-if="servicioDetalle.historial && servicioDetalle.historial.length" v-for="(actualizacion, index) in servicioDetalle.historial" :key="index" class="flex items-start">
                <div class="flex-shrink-0">
                  <div class="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center">
                    <svg class="h-4 w-4 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <p class="text-sm text-gray-300">{{ actualizacion.fecha }}</p>
                  <p class="text-sm text-gray-400">{{ actualizacion.descripcion }}</p>
                </div>
              </div>
              <div v-else class="text-gray-400 text-sm">Sin historial de actualizaciones.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/components/stores/auth';

export default {
  name: 'HistorialPage',
  setup() {
    const authStore = useAuthStore();
    const busqueda = ref('');
    const filtroEstado = ref('');
    const servicios = ref([]);
    const cargando = ref(true);
    const error = ref(null);
    const paginacion = ref({
      paginaActual: 1,
      totalPaginas: 1,
      desde: 0,
      hasta: 0,
      total: 0
    });
    const estadisticas = ref({
      totalGastado: 0,
      abiertas: 0,
      enProceso: 0,
      finalizadas: 0
    });
    const mostrarDetalles = ref(false);
    const servicioDetalle = ref(null);

    const estadosDisponibles = [
      { value: '', label: 'Todos los estados' },
      { value: 'abierta', label: 'Abierta' },
      { value: 'en progreso', label: 'En Progreso' },
      { value: 'finalizada', label: 'Finalizada' }
    ];

    const cargarServicios = async () => {
      try {
        cargando.value = true;
        await authStore.restoreSession?.();
        const usuarioId = authStore.user?.id;
        if (!usuarioId) throw new Error('No se encontró el usuario autenticado');
        const response = await axios.get(`/api/ordenes-servicio/usuario/${usuarioId}`);
        servicios.value = response.data.map(orden => ({
          id: orden.orden_id,
          tipo: orden.diagnostico || 'Sin diagnóstico',
          fecha: new Date(orden.fecha_inicio).toLocaleDateString(),
          precio: orden.total || '0',
          estado: normalizarEstado(orden.estado),
          descripcion: orden.notas || '',
          cliente: {
            nombre: `${orden.nombre_usuario || orden.nombre || ''} ${orden.apellido_usuario || orden.apellidoPaterno || ''}`.trim() || 'No disponible',
            telefono: orden.telefono || orden.telefono_usuario || 'No disponible',
            email: orden.email || orden.correoElectronico || 'No disponible',
          },
          vehiculo: {
            modelo: `${orden.marca_vehiculo || ''} ${orden.modelo_vehiculo || ''}`.trim() || 'No disponible',
            placa: orden.placa_vehiculo || 'No disponible',
            anio: orden.anio || 'No disponible'
          },
          historial: orden.historial || [],
          detalles: orden.detalles || []
        }));
        // Estadísticas
        estadisticas.value = {
          totalGastado: servicios.value.reduce((acc, s) => acc + Number(s.precio), 0),
          abiertas: servicios.value.filter(s => s.estado === 'abierta').length,
          enProceso: servicios.value.filter(s => s.estado === 'en progreso').length,
          finalizadas: servicios.value.filter(s => s.estado === 'finalizada').length
        };
        // Paginación
        const total = servicios.value.length;
        paginacion.value = {
          paginaActual: 1,
          totalPaginas: Math.ceil(total / 10),
          desde: 1,
          hasta: Math.min(10, total),
          total
        };
      } catch (err) {
        error.value = 'Error al cargar el historial de servicios';
        console.error('Error:', err);
      } finally {
        cargando.value = false;
      }
    };

    function normalizarEstado(estado) {
      if (!estado) return 'desconocido';
      const e = estado.toLowerCase().trim();
      if (e === 'completado' || e === 'finalizado' || e === 'finalizada') return 'finalizada';
      if (e === 'en proceso' || e === 'en progreso') return 'en progreso';
      if (e === 'pendiente' || e === 'abierta') return 'abierta';
      return e;
    }

    const serviciosFiltrados = computed(() => {
      return servicios.value.filter(servicio => {
        const coincideEstado = !filtroEstado.value || servicio.estado === filtroEstado.value;
        const coincideBusqueda = servicio.tipo.toLowerCase().includes(busqueda.value.toLowerCase());
        return coincideEstado && coincideBusqueda;
      });
    });

    const cambiarPagina = (pagina) => {
      paginacion.value.paginaActual = pagina;
      paginacion.value.desde = (pagina - 1) * 10 + 1;
      paginacion.value.hasta = Math.min(pagina * 10, paginacion.value.total);
    };

    const badgeEstado = (estado) => {
      switch (estado) {
        case 'finalizada':
          return 'px-2 py-1 rounded-full text-xs font-semibold bg-green-200 text-green-800';
        case 'en progreso':
          return 'px-2 py-1 rounded-full text-xs font-semibold bg-blue-200 text-blue-800';
        case 'abierta':
          return 'px-2 py-1 rounded-full text-xs font-semibold bg-yellow-200 text-yellow-800';
        default:
          return 'px-2 py-1 rounded-full text-xs font-semibold bg-gray-300 text-gray-900';
      }
    };

    const verDetalles = (servicio) => {
      // Obtener detalles extendidos si es necesario, aquí solo se usa el objeto ya cargado
      // Si el backend lo permite, podrías hacer una petición por id aquí
      servicioDetalle.value = servicio;
      mostrarDetalles.value = true;
    };

    const generarPDF = (servicio) => {
      const url = `https://toyotaback.onrender.com/api/ordenes-servicio/${servicio.id}/pdf`;
      window.open(url, '_blank');
    };

    onMounted(() => {
      cargarServicios();
    });

    return {
      busqueda,
      filtroEstado,
      servicios,
      serviciosFiltrados,
      cargando,
      error,
      paginacion,
      estadisticas,
      estadosDisponibles,
      cambiarPagina,
      badgeEstado,
      verDetalles,
      generarPDF,
      mostrarDetalles,
      servicioDetalle
    };
  }
};
</script>