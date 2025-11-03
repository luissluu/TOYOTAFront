<template>
    <div class="flex flex-col w-full px-6">
      <!-- Encabezado del Dashboard -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white">Dashboard Administrativo</h1>
        <p class="text-gray-400 mt-2">Bienvenido al panel de control. Aquí puedes ver un resumen de las operaciones.</p>
      </div>

      <section class="grid grid-cols-1 gap-8 px-8 md:grid-cols-1 lg:grid-cols-3">
        <!-- Tarjetas de estadísticas rápidas -->
        <div class="bg-gray-800 p-6 rounded-lg shadow-lg lg:col-span-1 hover:bg-gray-750 transition-colors duration-200">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-blue-500 rounded-md p-3">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div class="ml-5">
              <p class="text-sm font-medium text-gray-300">Clientes Totales</p>
              <p class="text-3xl font-semibold text-white">{{ kpis.clientes }}</p>
              <div class="flex items-center mt-1">
                <svg class="h-4 w-4 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <p class="text-sm text-green-400 ml-1">+12% este mes</p>
              </div>
            </div>
          </div>
        </div>
  
        <div class="bg-gray-800 p-6 rounded-lg shadow-lg lg:col-span-1 hover:bg-gray-750 transition-colors duration-200">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-red-600 rounded-md p-3">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-5">
              <p class="text-sm font-medium text-gray-300">Ingresos Mensuales</p>
              <p class="text-3xl font-semibold text-white">{{ formatCurrency(kpis.ingresosMes) }}</p>
              <div class="flex items-center mt-1">
                <svg class="h-4 w-4 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <p class="text-sm text-green-400 ml-1">+8.2% vs último mes</p>
              </div>
            </div>
          </div>
        </div>
  
        <div class="bg-gray-800 p-6 rounded-lg shadow-lg lg:col-span-1 hover:bg-gray-750 transition-colors duration-200">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-green-500 rounded-md p-3">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <div class="ml-5">
              <p class="text-sm font-medium text-gray-300">Servicios Completados</p>
              <p class="text-3xl font-semibold text-white">{{ kpis.completados }}</p>
              <div class="flex items-center mt-1">
                <svg class="h-4 w-4 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <p class="text-sm text-green-400 ml-1">+5% este mes</p>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Gráfico principal: Servicios por popularidad -->
        <div class="bg-gray-800 p-6 rounded-lg shadow-lg lg:col-span-2">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-xl font-bold text-white">Servicios Más Populares</h2>
              <p class="text-sm text-gray-400 mt-1">Distribución de servicios por tipo</p>
            </div>
            <div class="flex space-x-2">
              <button 
                @click="filtroServiciosPopulares = 'mes'"
                :class="[
                  'px-4 py-2 text-sm rounded-md transition-colors duration-200',
                  filtroServiciosPopulares === 'mes' 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                ]"
              >
                Este Mes
              </button>
              <button 
                @click="filtroServiciosPopulares = 'año'"
                :class="[
                  'px-4 py-2 text-sm rounded-md transition-colors duration-200',
                  filtroServiciosPopulares === 'año' 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                ]"
              >
                Este Año
              </button>
            </div>
          </div>
          
          <!-- Canvas del gráfico -->
          <div class="mt-4" style="height: 350px;">
            <canvas id="serviciosPopularesChart" ref="serviciosPopularesChart"></canvas>
          </div>
        </div>
  
        <!-- Tabla de servicios recientes -->
        <div class="bg-gray-800 p-6 rounded-lg shadow-lg lg:col-span-1">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-xl font-bold text-white">Servicios Recientes</h2>
              <p class="text-sm text-gray-400 mt-1">Últimos servicios registrados</p>
            </div>
            <button class="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200">Ver Todos</button>
          </div>
          
          <div class="mt-4 space-y-4">
            <div v-for="rec in recientes" :key="rec.id" class="bg-gray-700 p-4 rounded-lg hover:bg-gray-650 transition-colors duration-200">
              <div class="flex justify-between items-start">
                <div>
                  <p class="text-white font-medium">{{ rec.servicio }}</p>
                  <div class="flex items-center mt-1">
                    <img class="h-6 w-6 rounded-full" :src="rec.avatar" :alt="rec.cliente">
                    <p class="text-sm text-gray-400 ml-2">{{ rec.cliente }}</p>
                  </div>
                </div>
                <span :class="rec.badgeClass">{{ rec.estado }}</span>
              </div>
              <div class="flex items-center mt-3 text-sm text-gray-400">
                <svg class="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ rec.hace }}
              </div>
            </div>
          </div>
        </div>
  
        <!-- Gráfico de ingresos por categoría -->
        <div class="bg-gray-800 p-6 rounded-lg shadow-lg lg:col-span-3">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-xl font-bold text-white">Ingresos por Categoría</h2>
              <p class="text-sm text-gray-400 mt-1">Tendencia de ingresos por tipo de servicio</p>
            </div>
            <div class="flex space-x-2">
              <button 
                @click="filtroIngresos = '6meses'"
                :class="[
                  'px-4 py-2 text-sm rounded-md transition-colors duration-200',
                  filtroIngresos === '6meses' 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                ]"
              >
                6 Meses
              </button>
              <button 
                @click="filtroIngresos = '1año'"
                :class="[
                  'px-4 py-2 text-sm rounded-md transition-colors duration-200',
                  filtroIngresos === '1año' 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                ]"
              >
                1 Año
              </button>
            </div>
          </div>
          
          <!-- Canvas del gráfico -->
          <div class="mt-4" style="height: 350px;">
            <canvas id="ingresosCategoriaChart" ref="ingresosCategoriaChart"></canvas>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, watch } from 'vue';
  import Chart from 'chart.js/auto';
  import axios from '../../axios';
  
  export default {
    name: 'AdminHome',
    setup() {
      const kpis = ref({ clientes: 0, ingresosMes: 0, completados: 0 });
      const recientes = ref([]);
      const serviciosPopularesChart = ref(null);
      const ingresosCategoriaChart = ref(null);
      const filtroServiciosPopulares = ref('mes'); // 'mes' o 'año'
      const filtroIngresos = ref('6meses'); // '6meses' o '1año'
      let chartInstances = { serviciosPopulares: null, ingresosCategoria: null };
      
      function formatCurrency(n) {
        return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(n || 0);
      }

      const badgeEstado = (estado) => {
        const e = (estado || '').toLowerCase();
        if (e.includes('final')) return 'px-3 py-1 text-xs bg-green-800 text-green-100 rounded-full';
        if (e.includes('progres')) return 'px-3 py-1 text-xs bg-yellow-800 text-yellow-100 rounded-full';
        return 'px-3 py-1 text-xs bg-blue-800 text-blue-100 rounded-full';
      };

      // Variables globales para datos
      let ordenesGlobales = [];
      let detallesPorOrdenGlobal = {};
      let serviciosGlobales = [];
      let mapaServiciosGlobal = {};
      let mapaCategoriasGlobal = {};
      let mapaPrecioEstimadoGlobal = {};

      // Función para calcular servicios populares según filtro
      const calcularServiciosPopulares = (ordenes, servicios, detallesPorOrden, filtro) => {
        const ahora = new Date();
        const mes = ahora.getMonth();
        const anio = ahora.getFullYear();

        // Filtrar órdenes según el filtro
        let ordenesFiltradas = ordenes;
        if (filtro === 'mes') {
          ordenesFiltradas = ordenes.filter(o => {
            const f = new Date(o.fecha_inicio || o.fecha || ahora);
            return f.getMonth() === mes && f.getFullYear() === anio;
          });
        } else if (filtro === 'año') {
          ordenesFiltradas = ordenes.filter(o => {
            const f = new Date(o.fecha_inicio || o.fecha || ahora);
            return f.getFullYear() === anio;
          });
        }

        const obtenerDetalles = (orden) => {
          if (orden?.detalles && orden.detalles.length) return orden.detalles;
          const oid = orden?.orden_id || orden?.id;
          return (oid && detallesPorOrden[oid]) ? detallesPorOrden[oid] : [];
        };

        const conteoServicios = {};
        const ordenesPorServicio = {};

        ordenesFiltradas.forEach(o => {
          const detalles = obtenerDetalles(o);
          if (!detalles || !detalles.length) return;

          detalles.forEach(d => {
            const servicioIdRaw = d.servicio_id || d.id_servicio;
            const servicioId = servicioIdRaw ? Number(servicioIdRaw) : null;

            let nombreServicio = 'Otro';
            if (servicioId && !isNaN(servicioId)) {
              nombreServicio = mapaServiciosGlobal[servicioId] || mapaServiciosGlobal[String(servicioId)] || d.nombre_servicio || 'Otro';
            } else if (d.nombre_servicio) {
              nombreServicio = d.nombre_servicio;
            }

            if (!conteoServicios[nombreServicio]) {
              conteoServicios[nombreServicio] = 0;
              ordenesPorServicio[nombreServicio] = new Set();
            }

            const ordenKey = o.orden_id || o.id;
            if (ordenKey && !ordenesPorServicio[nombreServicio].has(ordenKey)) {
              conteoServicios[nombreServicio]++;
              ordenesPorServicio[nombreServicio].add(ordenKey);
            }
          });
        });

        let labelsPop = Object.keys(conteoServicios);
        let dataPop = labelsPop.map(k => conteoServicios[k]);

        const pares = labelsPop.map((l, i) => ({ l, v: dataPop[i] }))
          .sort((a, b) => b.v - a.v)
          .slice(0, 7);
        labelsPop = pares.map(p => p.l);
        dataPop = pares.map(p => p.v);

        if (labelsPop.length === 0) {
          labelsPop = ['Sin registros'];
          dataPop = [0];
        }

        return {
          labels: labelsPop,
          datasets: [{
            label: 'Cantidad de servicios',
            data: dataPop,
            backgroundColor: [
              '#3B82F6', '#EF4444', '#10B981', '#F59E0B',
              '#8B5CF6', '#EC4899', '#6366F1'
            ],
            borderWidth: 0,
            borderRadius: 4
          }]
        };
      };

      // Función para calcular ingresos por categoría según filtro
      const calcularIngresosPorCategoria = (ordenes, detallesPorOrden, filtro) => {
        const ahora = new Date();
        const mes = ahora.getMonth();
        const anio = ahora.getFullYear();

        const obtenerDetalles = (orden) => {
          if (orden?.detalles && orden.detalles.length) return orden.detalles;
          const oid = orden?.orden_id || orden?.id;
          return (oid && detallesPorOrden[oid]) ? detallesPorOrden[oid] : [];
        };

        const mesesLabels = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
        const categorias = ['mantenimiento', 'motor', 'frenos', 'suspension'];
        const ingresosPorCategoriaMes = {};

        categorias.forEach(cat => {
          ingresosPorCategoriaMes[cat] = new Array(12).fill(0);
        });

        // Determinar rango de meses según filtro
        let mesesMostrar = 6;
        let mesInicio = Math.max(0, mes - 5);
        if (filtro === '1año') {
          mesesMostrar = 12;
          mesInicio = 0;
        }

        ordenes.forEach(o => {
          const f = new Date(o.fecha_inicio || o.fecha || ahora);
          const y = f.getFullYear();
          if (y === anio) {
            const mesIdx = f.getMonth();
            const detalles = obtenerDetalles(o);
            if (detalles && detalles.length) {
              detalles.forEach(d => {
                const servicioIdRaw = d.servicio_id || d.id_servicio;
                if (!servicioIdRaw) return;

                const servicioId = Number(servicioIdRaw);
                if (isNaN(servicioId)) return;

                const categoria = mapaCategoriasGlobal[servicioId] || mapaCategoriasGlobal[String(servicioId)] || 'otro';

                if (categorias.includes(categoria)) {
                  const precio = mapaPrecioEstimadoGlobal[servicioId] || mapaPrecioEstimadoGlobal[String(servicioId)] || 0;
                  ingresosPorCategoriaMes[categoria][mesIdx] += precio;
                }
              });
            }
          }
        });

        const labelsMostrar = mesesLabels.slice(mesInicio, mesInicio + mesesMostrar);
        const colores = {
          'mantenimiento': { border: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)' },
          'motor': { border: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)' },
          'frenos': { border: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' },
          'suspension': { border: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' }
        };

        return {
          labels: labelsMostrar,
          datasets: categorias.map(cat => ({
            label: cat === 'mantenimiento' ? 'Mantenimiento básico' :
                   cat === 'motor' ? 'Sistema de motor' :
                   cat === 'frenos' ? 'Sistema de frenos' :
                   'Suspensión y dirección',
            data: ingresosPorCategoriaMes[cat].slice(mesInicio, mesInicio + mesesMostrar),
            borderColor: colores[cat].border,
            backgroundColor: colores[cat].bg,
            tension: 0.4,
            fill: true
          }))
        };
      };

      // Función para actualizar gráfico de servicios populares
      const actualizarGraficoServiciosPopulares = () => {
        if (!serviciosPopularesChart.value) return;
        
        const data = calcularServiciosPopulares(
          ordenesGlobales,
          serviciosGlobales,
          detallesPorOrdenGlobal,
          filtroServiciosPopulares.value
        );

        if (chartInstances.serviciosPopulares) {
          chartInstances.serviciosPopulares.destroy();
        }

        chartInstances.serviciosPopulares = new Chart(serviciosPopularesChart.value, {
          type: 'bar',
          data: data,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: 'rgba(17, 24, 39, 0.9)',
                titleColor: '#fff',
                bodyColor: '#fff',
                padding: 12,
                bodyFont: { size: 14 },
                titleFont: { size: 16, weight: 'bold' }
              }
            },
            scales: {
              y: {
                ticks: { color: '#9CA3AF' },
                grid: { color: 'rgba(75, 85, 99, 0.2)' }
              },
              x: {
                ticks: { 
                  color: '#9CA3AF',
                  stepSize: 1,
                  callback: function(value) {
                    return Number.isInteger(value) ? value : '';
                  }
                },
                grid: { color: 'rgba(75, 85, 99, 0.2)' }
              }
            }
          }
        });
      };

      // Función para actualizar gráfico de ingresos por categoría
      const actualizarGraficoIngresosCategoria = () => {
        if (!ingresosCategoriaChart.value) return;

        const data = calcularIngresosPorCategoria(
          ordenesGlobales,
          detallesPorOrdenGlobal,
          filtroIngresos.value
        );

        if (chartInstances.ingresosCategoria) {
          chartInstances.ingresosCategoria.destroy();
        }

        chartInstances.ingresosCategoria = new Chart(ingresosCategoriaChart.value, {
          type: 'line',
          data: data,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: 'top',
                labels: {
                  color: '#9CA3AF',
                  padding: 15,
                  font: { size: 12 }
                }
              },
              tooltip: {
                backgroundColor: 'rgba(17, 24, 39, 0.9)',
                titleColor: '#fff',
                bodyColor: '#fff',
                padding: 12,
                bodyFont: { size: 14 },
                titleFont: { size: 16, weight: 'bold' }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: { color: '#9CA3AF' },
                grid: { color: 'rgba(75, 85, 99, 0.2)' }
              },
              x: {
                ticks: { color: '#9CA3AF' },
                grid: { color: 'rgba(75, 85, 99, 0.2)' }
              }
            }
          }
        });
      };

      // Watchers para actualizar gráficos cuando cambien los filtros
      watch(filtroServiciosPopulares, () => {
        actualizarGraficoServiciosPopulares();
      });

      watch(filtroIngresos, () => {
        actualizarGraficoIngresosCategoria();
      });

      // Cargar datos reales
      onMounted(async () => {
        try {
          // Total clientes
          const usuariosRes = await axios.get('/api/usuarios');
          kpis.value.clientes = Array.isArray(usuariosRes.data) ? usuariosRes.data.length : 0;

        // Órdenes
        const ordenesRes = await axios.get('/api/ordenes-servicio');
        ordenesGlobales = Array.isArray(ordenesRes.data) ? ordenesRes.data : [];

        // Si las órdenes no traen detalles, intentar obtenerlos desde un endpoint global
        try {
          const faltanDetalles = ordenesGlobales.every(o => !o.detalles || o.detalles.length === 0);
          if (faltanDetalles) {
            const detRes = await axios.get('/api/detalles-orden');
            const detalles = Array.isArray(detRes.data) ? detRes.data : [];
            detallesPorOrdenGlobal = detalles.reduce((acc, d) => {
              const oid = d.orden_id || d.id_orden || d.idOrden;
              if (!oid) return acc;
              if (!acc[oid]) acc[oid] = [];
              acc[oid].push(d);
              return acc;
            }, {});
          }
        } catch (e) {
          console.warn('No se pudieron cargar detalles globales de órdenes:', e);
        }

        // Helper para obtener detalles (embebidos o globales)
        const obtenerDetalles = (orden) => {
          if (orden?.detalles && orden.detalles.length) return orden.detalles;
          const oid = orden?.orden_id || orden?.id;
          return (oid && detallesPorOrdenGlobal[oid]) ? detallesPorOrdenGlobal[oid] : [];
        };

          // KPIs
          const ahora = new Date();
          const mes = ahora.getMonth();
          const anio = ahora.getFullYear();
          kpis.value.completados = ordenesGlobales.filter(o => (o.estado || '').toLowerCase().includes('final')).length;
          kpis.value.ingresosMes = ordenesGlobales
            .filter(o => {
              const f = new Date(o.fecha_inicio || o.fecha || ahora);
              return f.getMonth() === mes && f.getFullYear() === anio;
            })
            .reduce((acc, o) => acc + Number(o.total || 0), 0);

          // Recientes (3)
          recientes.value = ordenesGlobales
            .sort((a, b) => new Date(b.fecha_inicio || b.fecha) - new Date(a.fecha_inicio || a.fecha))
            .slice(0, 3)
            .map(o => {
              const detalles = obtenerDetalles(o);
              return {
                id: o.orden_id,
                servicio: detalles?.[0]?.nombre_servicio || o.diagnostico || 'Servicio',
                cliente: `${o.nombre_usuario || o.nombre || ''} ${o.apellido_usuario || o.apellidoPaterno || ''}`.trim() || 'Cliente',
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(o.nombre_usuario || o.nombre || 'C')}+${encodeURIComponent(o.apellido_usuario || o.apellidoPaterno || '')}&background=random`,
                estado: (o.estado || '').toLowerCase(),
                badgeClass: badgeEstado(o.estado),
                hace: new Date(o.fecha_inicio || o.fecha).toLocaleString('es-MX', { dateStyle: 'medium', timeStyle: 'short' })
              };
            });

          // Obtener servicios reales de la BD
          const serviciosRes = await axios.get('/api/servicios');
          serviciosGlobales = Array.isArray(serviciosRes.data) ? serviciosRes.data : [];
          
          // Crear mapas globales de servicios
          serviciosGlobales.forEach(s => {
            const id = Number(s.servicio_id || s.id);
            const nombre = s.nombre || s.titulo || 'Sin nombre';
            if (id && !isNaN(id)) {
              mapaServiciosGlobal[id] = nombre;
              mapaServiciosGlobal[String(id)] = nombre;
            }
          });

          // Crear mapas de categorías y precios
          serviciosGlobales.forEach(s => {
            const idRaw = s.servicio_id || s.id;
            if (!idRaw) return;
            const id = Number(idRaw);
            if (isNaN(id)) return;
            
            const categoria = s.categoria || 'otro';
            const precio = Number(s.precio_estimado || 0);
            
            mapaCategoriasGlobal[id] = categoria;
            mapaCategoriasGlobal[String(id)] = categoria;
            mapaPrecioEstimadoGlobal[id] = precio;
            mapaPrecioEstimadoGlobal[String(id)] = precio;
          });

          // Inicializar gráficos después de cargar datos
          setTimeout(() => {
            actualizarGraficoServiciosPopulares();
            actualizarGraficoIngresosCategoria();
          }, 100);
        } catch (e) {
          console.error('Error cargando dashboard:', e);
        }
      });
  
      return {
        kpis,
        recientes,
        serviciosPopularesChart,
        ingresosCategoriaChart,
        filtroServiciosPopulares,
        filtroIngresos,
        formatCurrency
      };
    }
  };
  </script>
  
  <style>
  .bg-gray-750 {
    background-color: #2d3748;
  }
  .bg-gray-650 {
    background-color: #2d3748;
  }
  </style>