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
              <button class="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">Este Mes</button>
              <button class="px-4 py-2 text-sm bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors duration-200">Este Año</button>
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
              <button class="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">6 Meses</button>
              <button class="px-4 py-2 text-sm bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors duration-200">1 Año</button>
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
  import { ref, onMounted } from 'vue';
  import Chart from 'chart.js/auto';
  import axios from '../../axios';
  
  export default {
    name: 'AdminHome',
    setup() {
      const kpis = ref({ clientes: 0, ingresosMes: 0, completados: 0 });
      const recientes = ref([]);
      const serviciosPopularesChart = ref(null);
      const ingresosCategoriaChart = ref(null);
      
      function formatCurrency(n) {
        return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(n || 0);
      }

      const badgeEstado = (estado) => {
        const e = (estado || '').toLowerCase();
        if (e.includes('final')) return 'px-3 py-1 text-xs bg-green-800 text-green-100 rounded-full';
        if (e.includes('progres')) return 'px-3 py-1 text-xs bg-yellow-800 text-yellow-100 rounded-full';
        return 'px-3 py-1 text-xs bg-blue-800 text-blue-100 rounded-full';
      };

      // Cargar datos reales
      onMounted(async () => {
        try {
          // Total clientes
          const usuariosRes = await axios.get('/api/usuarios');
          kpis.value.clientes = Array.isArray(usuariosRes.data) ? usuariosRes.data.length : 0;

        // Órdenes
        const ordenesRes = await axios.get('/api/ordenes-servicio');
        const ordenes = Array.isArray(ordenesRes.data) ? ordenesRes.data : [];

        // Si las órdenes no traen detalles, intentar obtenerlos desde un endpoint global
        let detallesPorOrden = {};
        try {
          const faltanDetalles = ordenes.every(o => !o.detalles || o.detalles.length === 0);
          if (faltanDetalles) {
            const detRes = await axios.get('/api/detalles-orden');
            const detalles = Array.isArray(detRes.data) ? detRes.data : [];
            detallesPorOrden = detalles.reduce((acc, d) => {
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
          return (oid && detallesPorOrden[oid]) ? detallesPorOrden[oid] : [];
        };

          // KPIs
          const ahora = new Date();
          const mes = ahora.getMonth();
          const anio = ahora.getFullYear();
          kpis.value.completados = ordenes.filter(o => (o.estado || '').toLowerCase().includes('final')).length;
          kpis.value.ingresosMes = ordenes
            .filter(o => {
              const f = new Date(o.fecha_inicio || o.fecha || ahora);
              return f.getMonth() === mes && f.getFullYear() === anio;
            })
            .reduce((acc, o) => acc + Number(o.total || 0), 0);

          // Recientes (3)
          recientes.value = ordenes
            .sort((a, b) => new Date(b.fecha_inicio || b.fecha) - new Date(a.fecha_inicio || a.fecha))
            .slice(0, 3)
            .map(o => ({
              id: o.orden_id,
              servicio: o.detalles?.[0]?.nombre_servicio || o.diagnostico || 'Servicio',
              cliente: `${o.nombre_usuario || o.nombre || ''} ${o.apellido_usuario || o.apellidoPaterno || ''}`.trim() || 'Cliente',
              avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(o.nombre_usuario || o.nombre || 'C')}+${encodeURIComponent(o.apellido_usuario || o.apellidoPaterno || '')}&background=random`,
              estado: (o.estado || '').toLowerCase(),
              badgeClass: badgeEstado(o.estado),
              hace: new Date(o.fecha_inicio || o.fecha).toLocaleString('es-MX', { dateStyle: 'medium', timeStyle: 'short' })
            }));

          // Obtener servicios reales de la BD
          const serviciosRes = await axios.get('/api/servicios');
          const servicios = Array.isArray(serviciosRes.data) ? serviciosRes.data : [];
          
          // Crear mapa de servicio_id -> nombre (normalizar IDs a números para comparación)
          const mapaServicios = {};
          servicios.forEach(s => {
            const id = Number(s.servicio_id || s.id);
            const nombre = s.nombre || s.titulo || 'Sin nombre';
            if (id && !isNaN(id)) {
              mapaServicios[id] = nombre;
              // También guardar como string por si acaso
              mapaServicios[String(id)] = nombre;
            }
          });

          // Contar cuántas órdenes usan cada servicio (contar órdenes, no detalles)
          const conteoServicios = {};
          const ordenesPorServicio = {}; // Para evitar contar la misma orden múltiples veces
          
          // Debug: ver estructura de órdenes
          console.log('Estructura de órdenes:', ordenes.map(o => ({
            orden_id: o.orden_id || o.id,
            tiene_detalles: !!o.detalles,
            detalles_length: (obtenerDetalles(o))?.length || 0,
            primer_detalle: (obtenerDetalles(o))?.[0] || null
          })));
          
          ordenes.forEach(o => {
            const detalles = obtenerDetalles(o);
            if (!detalles || !detalles.length) {
              console.log('Orden sin detalles:', o.orden_id || o.id);
              return;
            }
            
            detalles.forEach(d => {
              // Normalizar servicio_id a número para comparar
              const servicioIdRaw = d.servicio_id || d.id_servicio;
              const servicioId = servicioIdRaw ? Number(servicioIdRaw) : null;
              
              console.log('Procesando detalle:', {
                servicio_id_raw: servicioIdRaw,
                servicio_id_normalizado: servicioId,
                nombre_servicio: d.nombre_servicio,
                detalle_completo: d
              });
              
              // Buscar nombre del servicio en el mapa
              let nombreServicio = 'Otro';
              if (servicioId && !isNaN(servicioId)) {
                nombreServicio = mapaServicios[servicioId] || mapaServicios[String(servicioId)] || d.nombre_servicio || 'Otro';
                console.log('Nombre encontrado:', nombreServicio, 'para servicio_id:', servicioId);
              } else if (d.nombre_servicio) {
                nombreServicio = d.nombre_servicio;
              }

              // Inicializar si no existe
              if (!conteoServicios[nombreServicio]) {
                conteoServicios[nombreServicio] = 0;
                ordenesPorServicio[nombreServicio] = new Set();
              }

              // Contar la orden solo una vez por servicio
              const ordenKey = o.orden_id || o.id;
              if (ordenKey && !ordenesPorServicio[nombreServicio].has(ordenKey)) {
                conteoServicios[nombreServicio]++;
                ordenesPorServicio[nombreServicio].add(ordenKey);
                console.log('Contando orden:', ordenKey, 'para servicio:', nombreServicio);
              }
            });
          });
          
          // Debug: verificar qué se está contando
          console.log('Mapa de servicios:', mapaServicios);
          console.log('Conteo de servicios:', conteoServicios);
          console.log('Total órdenes procesadas:', ordenes.length);
          
          // Convertir a array y ordenar por cantidad de órdenes (mayor a menor)
          let labelsPop = Object.keys(conteoServicios);
          let dataPop = labelsPop.map(k => conteoServicios[k]);
          
          // Ordenar por mayor cantidad de órdenes y limitar a 7
          const pares = labelsPop.map((l, i) => ({ l, v: dataPop[i] }))
            .sort((a, b) => b.v - a.v)
            .slice(0, 7);
          labelsPop = pares.map(p => p.l);
          dataPop = pares.map(p => p.v);
          
          // Si no hay datos, mostrar mensaje
          if (labelsPop.length === 0) {
            labelsPop = ['Sin registros'];
            dataPop = [0];
          }

        // Datos para el gráfico de servicios más populares
        const popularServicesData = {
          labels: labelsPop,
          datasets: [{
            label: 'Cantidad de servicios',
            data: dataPop,
            backgroundColor: [
              '#3B82F6', // blue-500
              '#EF4444', // red-500
              '#10B981', // green-500
              '#F59E0B', // amber-500
              '#8B5CF6', // violet-500
              '#EC4899', // pink-500
              '#6366F1'  // indigo-500
            ],
            borderWidth: 0,
            borderRadius: 4
          }]
        };

        // Mapas: servicio_id -> categoria y -> precio_estimado (normalizar IDs)
        const mapaCategorias = {};
        const mapaPrecioEstimado = {};
        servicios.forEach(s => {
          const idRaw = s.servicio_id || s.id;
          if (!idRaw) return;
          const id = Number(idRaw);
          if (isNaN(id)) return;
          
          const categoria = s.categoria || 'otro';
          const precio = Number(s.precio_estimado || 0);
          
          // Guardar como número y string
          mapaCategorias[id] = categoria;
          mapaCategorias[String(id)] = categoria;
          mapaPrecioEstimado[id] = precio;
          mapaPrecioEstimado[String(id)] = precio;
        });

        // Función para mapear categoría a nombre
        const nombreCategoria = (cat) => {
          const map = {
            'mantenimiento': 'Mantenimiento básico',
            'motor': 'Sistema de motor',
            'frenos': 'Sistema de frenos',
            'suspension': 'Suspensión y dirección'
          };
          return map[cat] || cat;
        };

        // Datos para el gráfico de ingresos por categoría (6 meses)
        const mesesLabels = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
        const categorias = ['mantenimiento', 'motor', 'frenos', 'suspension'];
        const ingresosPorCategoriaMes = {};
        
        categorias.forEach(cat => {
          ingresosPorCategoriaMes[cat] = new Array(12).fill(0);
        });

        ordenes.forEach(o => {
          const f = new Date(o.fecha_inicio || o.fecha || ahora);
          const y = f.getFullYear();
          if (y === anio) {
            const mesIdx = f.getMonth();
            // Obtener categoría desde los detalles de la orden
            const detalles = obtenerDetalles(o);
            if (detalles && detalles.length) {
              detalles.forEach(d => {
                const servicioIdRaw = d.servicio_id || d.id_servicio;
                if (!servicioIdRaw) {
                  console.log('Detalle sin servicio_id:', d);
                  return;
                }
                
                // Normalizar servicio_id
                const servicioId = Number(servicioIdRaw);
                if (isNaN(servicioId)) {
                  console.log('servicio_id no es número:', servicioIdRaw);
                  return;
                }
                
                // Buscar categoría en el mapa (intentar número y string)
                const categoria = mapaCategorias[servicioId] || mapaCategorias[String(servicioId)] || 'otro';
                
                console.log('Procesando ingreso - servicio_id:', servicioId, 'categoría:', categoria, 'mes:', mesIdx);
                
                if (categorias.includes(categoria)) {
                  // Sumar SIEMPRE el precio estimado del servicio
                  const precio = mapaPrecioEstimado[servicioId] || mapaPrecioEstimado[String(servicioId)] || 0;
                  console.log('Sumando precio:', precio, 'a categoría:', categoria, 'mes:', mesIdx);
                  ingresosPorCategoriaMes[categoria][mesIdx] += precio;
                } else {
                  console.log('Categoría no incluida en lista:', categoria);
                }
              });
            } else {
              console.log('Orden sin detalles para ingresos:', o.orden_id || o.id);
            }
          } else {
            console.log('Orden de otro año:', o.orden_id || o.id, 'año:', y, 'año actual:', anio);
          }
        });
        
        // Debug: verificar ingresos calculados
        console.log('Ingresos por categoría mes:', ingresosPorCategoriaMes);
        console.log('Mapa de categorías:', mapaCategorias);
        console.log('Mapa de precios:', mapaPrecioEstimado);

        const ultimos6Labels = mesesLabels.slice(Math.max(0, mes-5), mes+1);
        const colores = {
          'mantenimiento': { border: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)' },
          'motor': { border: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)' },
          'frenos': { border: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' },
          'suspension': { border: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' }
        };

        const ingresosCategoriasData = {
          labels: ultimos6Labels,
          datasets: categorias.map(cat => ({
            label: nombreCategoria(cat),
            data: ingresosPorCategoriaMes[cat].slice(Math.max(0, mes-5), mes+1),
            borderColor: colores[cat].border,
            backgroundColor: colores[cat].bg,
            tension: 0.4,
            fill: true
          }))
        };
  
        // Crear el gráfico de servicios más populares
        if (serviciosPopularesChart.value) {
          new Chart(serviciosPopularesChart.value, {
            type: 'bar',
            data: popularServicesData,
            options: {
              responsive: true,
              maintainAspectRatio: false,
              indexAxis: 'y',
              plugins: {
                legend: {
                  display: false
                },
                tooltip: {
                  backgroundColor: 'rgba(17, 24, 39, 0.9)',
                  titleColor: '#fff',
                  bodyColor: '#fff',
                  padding: 12,
                  bodyFont: {
                    size: 14
                  },
                  titleFont: {
                    size: 16,
                    weight: 'bold'
                  }
                }
              },
              scales: {
                y: {
                  ticks: {
                    color: '#9CA3AF'
                  },
                  grid: {
                    color: 'rgba(75, 85, 99, 0.2)'
                  }
                },
                x: {
                  ticks: {
                    color: '#9CA3AF'
                  },
                  grid: {
                    color: 'rgba(75, 85, 99, 0.2)'
                  }
                }
              }
            }
          });
        }
  
        // Crear el gráfico de ingresos por categoría
        if (ingresosCategoriaChart.value) {
          new Chart(ingresosCategoriaChart.value, {
            type: 'line',
            data: ingresosCategoriasData,
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                  labels: {
                    color: '#D1D5DB',
                    padding: 20,
                    font: {
                      size: 12
                    }
                  }
                },
                tooltip: {
                  backgroundColor: 'rgba(17, 24, 39, 0.9)',
                  titleColor: '#fff',
                  bodyColor: '#fff',
                  padding: 12,
                  callbacks: {
                    label: function(context) {
                      let label = context.dataset.label || '';
                      if (label) {
                        label += ': ';
                      }
                      if (context.parsed.y !== null) {
                        label += new Intl.NumberFormat('es-MX', { 
                          style: 'currency', 
                          currency: 'MXN' 
                        }).format(context.parsed.y);
                      }
                      return label;
                    }
                  }
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    color: '#9CA3AF',
                    callback: function(value) {
                      return '$' + value.toLocaleString('es-MX');
                    }
                  },
                  grid: {
                    color: 'rgba(75, 85, 99, 0.2)'
                  }
                },
                x: {
                  ticks: {
                    color: '#9CA3AF'
                  },
                  grid: {
                    color: 'rgba(75, 85, 99, 0.2)'
                  }
                }
              }
            }
          });
        }
        } catch (e) {
          console.error('Error cargando dashboard:', e);
        }
      });
  
      return {
        kpis,
        recientes,
        serviciosPopularesChart,
        ingresosCategoriaChart,
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