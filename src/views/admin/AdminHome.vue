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
              <p class="text-3xl font-semibold text-white">{{ totalClientes }}</p>
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
            <div class="flex-shrink-0 bg-green-500 rounded-md p-3">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <div class="ml-5">
              <p class="text-sm font-medium text-gray-300">Servicios Completados</p>
              <p class="text-3xl font-semibold text-white">{{ serviciosCompletados }}</p>
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
            <div v-for="servicio in serviciosRecientes" :key="servicio.orden_id" class="bg-gray-700 p-4 rounded-lg hover:bg-gray-650 transition-colors duration-200">
              <div class="flex justify-between items-start">
                <div>
                  <p class="text-white font-medium">{{ servicio.nombre_servicio }}</p>
                  <div class="flex items-center mt-1">
                    <img class="h-6 w-6 rounded-full" :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(servicio.nombre + ' ' + servicio.apellidoPaterno)}&background=random`" :alt="servicio.nombre">
                    <p class="text-sm text-gray-400 ml-2">{{ servicio.nombre }} {{ servicio.apellidoPaterno }}</p>
                  </div>
                </div>
                <span
                  class="px-3 py-1 text-xs rounded-full"
                  :class="{
                    'bg-green-800 text-green-100': servicio.estado === 'finalizada',
                    'bg-yellow-800 text-yellow-100': servicio.estado === 'en proceso',
                    'bg-blue-800 text-blue-100': servicio.estado === 'programado'
                  }"
                >{{ servicio.estado }}</span>
              </div>
              <div class="flex items-center mt-3 text-sm text-gray-400">
                <svg class="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Hace 2 horas
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import Chart from 'chart.js/auto';
  
  export default {
    name: 'AdminHome',
    setup() {
      const serviciosPopularesChart = ref(null);
      const totalClientes = ref(0);
      const serviciosCompletados = ref(0);
      const serviciosPopulares = ref([]);
      const serviciosRecientes = ref([]);
      
      // Cargar estadísticas reales
      const cargarEstadisticas = async () => {
        try {
          const [clientesRes, completadosRes, popularesRes, recientesRes] = await Promise.all([
            axios.get('/api/estadisticas/clientes'),
            axios.get('/api/estadisticas/completados'),
            axios.get('/api/estadisticas/populares'),
            axios.get('/api/estadisticas/recientes')
          ]);
          totalClientes.value = clientesRes.data.total;
          serviciosCompletados.value = completadosRes.data.completados;
          serviciosPopulares.value = popularesRes.data;
          serviciosRecientes.value = recientesRes.data;
        } catch (err) {
          console.error('Error al cargar estadísticas', err);
        }
      };

      // Crear el gráfico de servicios más populares con datos reales
      const renderServiciosPopularesChart = () => {
        if (serviciosPopularesChart.value && serviciosPopulares.value.length) {
          const labels = serviciosPopulares.value.map(s => s.nombre_servicio);
          const data = serviciosPopulares.value.map(s => s.cantidad);
          new Chart(serviciosPopularesChart.value, {
            type: 'bar',
            data: {
              labels,
              datasets: [{
                label: 'Cantidad de servicios',
                data,
                backgroundColor: [
                  '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#6366F1'
                ],
                borderWidth: 0,
                borderRadius: 4
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              indexAxis: 'y',
              plugins: {
                legend: { display: false }
              },
              scales: {
                y: { ticks: { color: '#9CA3AF' }, grid: { color: 'rgba(75, 85, 99, 0.2)' } },
                x: { ticks: { color: '#9CA3AF' }, grid: { color: 'rgba(75, 85, 99, 0.2)' } }
              }
            }
          });
        }
      };

      onMounted(async () => {
        await cargarEstadisticas();
        renderServiciosPopularesChart();
      });

      return {
        serviciosPopularesChart,
        totalClientes,
        serviciosCompletados,
        serviciosPopulares,
        serviciosRecientes
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