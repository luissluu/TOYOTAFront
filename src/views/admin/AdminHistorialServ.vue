// src/views/admin/AdminHistorialServicios.vue
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
                  placeholder="Buscar servicio..." 
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
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Cliente</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Vehículo</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Fecha</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Precio</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Estado</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody class="bg-gray-700 divide-y divide-gray-600">
                  <tr v-if="serviciosFiltrados.length === 0" class="hover:bg-gray-600 transition-colors duration-200">
                    <td colspan="8" class="px-6 py-4 text-center text-sm text-gray-400">
                      No se encontraron servicios
                    </td>
                  </tr>
                  <tr v-for="servicio in serviciosFiltrados" :key="servicio.id" class="hover:bg-gray-600 transition-colors duration-200">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">{{ servicio.id }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">{{ servicio.tipo }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                          <img class="h-10 w-10 rounded-full" :src="servicio.cliente.avatar" :alt="servicio.cliente.nombre">
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-white">{{ servicio.cliente.nombre }}</div>
                          <div class="text-sm text-gray-400">{{ servicio.cliente.telefono }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-white">{{ servicio.vehiculo.modelo }}</div>
                      <div class="text-sm text-gray-400">{{ servicio.vehiculo.placa }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">{{ servicio.fecha }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">${{ servicio.precio }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="badgeEstado(servicio.estado)">{{ servicio.estado }}</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div class="flex space-x-3">
                        <button 
                          @click="generarPDF(servicio)" 
                          class="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                          title="Generar PDF"
                        >
                          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </button>
                        <button 
                          @click="verDetalles(servicio)" 
                          class="text-gray-400 hover:text-gray-300 transition-colors duration-200"
                          title="Ver detalles"
                        >
                          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
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
                <svg viewBox="0 0 512 512" class="h-7 w-7 text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentColor" d="M219.59,292.5a8,8,0,0,1,0,11.31l-90.05,90.06a8,8,0,1,1-11.31-11.32l90.05-90.05A8,8,0,0,1,219.59,292.5Zm208.74,96A8,8,0,0,1,415,391.78l-27.15-27.15L373.1,379.39l27.16,27.17a8,8,0,0,1-3.32,13.3,51.5,51.5,0,0,1-15.08,2.21c-15.64,0-31.77-6.7-43.91-18.84-11.61-11.61-18.35-26.77-18.82-42.06l-52.38-52.39a8,8,0,0,1-1.77-1.33l-5.57-5.57a43.89,43.89,0,0,1-11.05,18.41l-97.47,97.47a43.34,43.34,0,0,1-29.17,12.84l-1.5,0a38.51,38.51,0,0,1-27.56-11.22c-15.59-15.59-14.85-41.71,1.66-58.22l97.47-97.47a44,44,0,0,1,18.4-11.05l-5.55-5.55a8,8,0,0,1-1.33-1.77l-52.55-52.56c-15.28-.46-30.43-7.2-42-18.81-16.11-16.13-22.64-39.27-16.64-59a8,8,0,0,1,13.31-3.32l27.16,27.15,14.76-14.77L120.15,96.91a8,8,0,0,1,3.32-13.31c19.71-6,42.87.51,59,16.63,11.62,11.61,18.36,26.77,18.83,42.07l70,70L379.11,104.42A7.71,7.71,0,0,1,381,103L418.3,83A8,8,0,0,1,429.13,93.8l-20.08,37.3a8,8,0,0,1-1.39,1.87L299.81,240.82l69.85,69.85c15.28.46,30.42,7.2,42,18.81C427.81,345.61,434.33,368.76,428.33,388.46ZM282.73,278.38l-49-49-11.89,11.88,49,49Zm-16.16-38.8,5.93,5.93,123-123,6.9-12.82-12.83,6.89ZM159.73,179.14l50.79,50.79,17.54-17.54a8,8,0,0,1,11.31,0l15.88,15.88,4.69-4.69-72.31-72.31a8,8,0,0,1-2.34-5.93c.41-12.08-4.74-24.4-14.14-33.79a47.85,47.85,0,0,0-27.61-13.88l20.74,20.75a8,8,0,0,1,0,11.31L138.2,155.81a8,8,0,0,1-11.31,0l-20.73-20.73A48,48,0,0,0,120,162.67c9.4,9.39,21.71,14.54,33.77,14.13h.28A8,8,0,0,1,159.73,179.14Zm85.41,108.47-20.68-20.67A27.17,27.17,0,0,0,203.11,275L105.63,372.5c-10.27,10.27-11,26.24-1.65,35.6a22.78,22.78,0,0,0,17.17,6.51,27.4,27.4,0,0,0,18.42-8.16L237.05,309a27.4,27.4,0,0,0,8.16-18.42A24,24,0,0,0,245.14,287.61Zm169.11,80.77a47.87,47.87,0,0,0-13.87-27.58c-9.4-9.4-21.71-14.54-33.76-14.13a8,8,0,0,1-5.93-2.34L288.5,252.14l-4.69,4.69,15.89,15.9a8,8,0,0,1,0,11.31l-17.53,17.53,50.61,50.63a8,8,0,0,1,2.34,5.92c-.4,12.08,4.75,24.4,14.14,33.8a47.89,47.89,0,0,0,27.61,13.87l-20.74-20.74a8,8,0,0,1,0-11.32l26.08-26.08a8,8,0,0,1,11.31,0Z"/>
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-300">Servicios Totales</p>
                <p class="text-xl font-bold text-white">{{ estadisticas.total }}</p>
              </div>
            </div>
            <div class="bg-gray-700 p-4 rounded-xl shadow flex items-center gap-4 hover:scale-105 hover:shadow-lg transition-all duration-300 border border-gray-600">
              <div class="flex-shrink-0 bg-yellow-400 rounded-lg h-12 w-12 flex items-center justify-center">
                <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-300">Abiertas</p>
                <p class="text-xl font-bold text-white">{{ estadisticas.abiertas }}</p>
              </div>
            </div>
            <div class="bg-gray-700 p-4 rounded-xl shadow flex items-center gap-4 hover:scale-105 hover:shadow-lg transition-all duration-300 border border-gray-600">
              <div class="flex-shrink-0 bg-blue-400 rounded-lg h-12 w-12 flex items-center justify-center">
                <svg viewBox="0 0 24 24" class="h-7 w-7 text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g> <path fill="currentColor" d="M23,24H1v-2h2.4c-1.6-5,1.6-7,3.7-8.4C8,13,8.9,12.5,8.9,12S8,10.9,7.1,10.4C5,9,1.8,7.1,3.4,2H1V0h22v2h-2.4 c1.6,5-1.6,7-3.7,8.4c-1,0.5-1.9,1.1-1.9,1.6s0.9,1.1,1.8,1.6c2.1,1.4,5.3,3.4,3.7,8.4H23V24z M5.6,22h12.8c1.6-4-0.5-5.3-2.6-6.7 C14.4,14.5,13,13.6,13,12c0-1.6,1.4-2.5,2.8-3.3C17.9,7.3,20,6,18.4,2H5.6C4,6,6.1,7.3,8.2,8.7C9.6,9.5,11,10.4,11,12 c0,1.6-1.4,2.5-2.8,3.3C6.1,16.7,4,18,5.6,22z"></path> <path fill="currentColor" d="M16.8,23H7c-0.3-1.5,0.2-2.4,2.3-4.3c0.8-0.7,1.8-1.5,2.7-2.8c1,1.2,2,2.1,2.7,2.8C16.8,20.7,17.3,21,16.8,23z"></path> <path fill="currentColor" d="M9.4,6c-0.7,1.3-0.7,1.3,0.9,2.1c0.5,0.2,1.1,0.5,1.6,0.9c0.5-0.4,1.2-0.7,1.6-0.9c1.7-0.8,1.7-0.8,1-2.1"></path> </g>
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-300">En Progreso</p>
                <p class="text-xl font-bold text-white">{{ estadisticas.enProgreso }}</p>
              </div>
            </div>
            <div class="bg-gray-700 p-4 rounded-xl shadow flex items-center gap-4 hover:scale-105 hover:shadow-lg transition-all duration-300 border border-gray-600">
              <div class="flex-shrink-0 bg-green-500 rounded-lg h-12 w-12 flex items-center justify-center">
                <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-300">Finalizadas</p>
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
                  <span class="text-gray-400">Nombre:</span> {{ servicioDetalle.cliente.nombre }}
                </p>
                <p class="text-gray-300">
                  <span class="text-gray-400">Teléfono:</span> {{ servicioDetalle.cliente.telefono }}
                </p>
                <p class="text-gray-300">
                  <span class="text-gray-400">Email:</span> {{ servicioDetalle.cliente.email }}
                </p>
              </div>
            </div>
            <div class="bg-gray-700 p-4 rounded-lg">
              <h4 class="text-lg font-medium text-white mb-3">Información del Vehículo</h4>
              <div class="space-y-2">
                <p class="text-gray-300">
                  <span class="text-gray-400">Modelo:</span> {{ servicioDetalle.vehiculo.modelo }}
                </p>
                <p class="text-gray-300">
                  <span class="text-gray-400">Placa:</span> {{ servicioDetalle.vehiculo.placa }}
                </p>
                <p class="text-gray-300">
                  <span class="text-gray-400">Año:</span> {{ servicioDetalle.vehiculo.anio }}
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
              <div v-for="(actualizacion, index) in servicioDetalle.historial" :key="index" class="flex items-start">
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
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default {
  name: 'AdminHistorialServicios',
  setup() {
    const mostrarDetalles = ref(false);
    const servicioDetalle = ref(null);
    const busqueda = ref('');
    const filtroEstado = ref('');
    const filtroPeriodo = ref('');
    const servicios = ref([]);
    const cargando = ref(true);
    const error = ref(null);

    const estadisticas = ref({
      total: 0,
      abiertas: 0,
      enProgreso: 0,
      finalizadas: 0,
      pendientes: 0
    });

    const paginacion = ref({
      paginaActual: 1,
      totalPaginas: 1,
      desde: 0,
      hasta: 0,
      total: 0
    });

    const cargarServicios = async () => {
      try {
        cargando.value = true;
        const response = await axios.get('/api/ordenes-servicio');
        servicios.value = response.data.map(orden => ({
          id: orden.orden_id,
          tipo: orden.diagnostico || 'Sin diagnóstico',
          cliente: {
            nombre: `${orden.nombre_usuario} ${orden.apellido_usuario}`,
            telefono: orden.telefono || 'No disponible',
            email: orden.email || 'No disponible',
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(orden.nombre_usuario)}+${encodeURIComponent(orden.apellido_usuario)}&background=random`
          },
          vehiculo: {
            modelo: `${orden.marca_vehiculo} ${orden.modelo_vehiculo}`,
            placa: orden.placa_vehiculo,
            anio: orden.anio || 'No disponible'
          },
          fecha: new Date(orden.fecha_inicio).toLocaleDateString(),
          precio: orden.total || '0',
          estado: orden.estado ? orden.estado.toLowerCase() : 'desconocido',
          descripcion: orden.notas || '',
          historial: [
            {
              fecha: new Date(orden.fecha_inicio).toLocaleString(),
              descripcion: `Orden creada por ${orden.nombre_usuario} ${orden.apellido_usuario}`
            }
          ]
        }));

        // Calcular estadísticas dinámicamente según los estados presentes (excepto cancelada)
        const total = servicios.value.length;
        const estados = ['abierta', 'en progreso', 'finalizada'];
        const conteos = {};
        estados.forEach(e => {
          conteos[e] = servicios.value.filter(s => s.estado === e).length;
        });

        estadisticas.value = {
          total,
          abiertas: conteos['abierta'],
          enProgreso: conteos['en progreso'],
          finalizadas: conteos['finalizada'],
          pendientes: conteos['pendiente']
        };

        // Actualizar paginación
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

    const estadosDisponibles = [
      { value: '', label: 'Todos los estados' },
      { value: 'abierta', label: 'Abierta' },
      { value: 'en progreso', label: 'En Progreso' },
      { value: 'finalizada', label: 'Finalizada' },
      { value: 'pendiente', label: 'Pendiente' }
    ];
    const periodosDisponibles = [
      { value: '', label: 'Todos los períodos' },
      { value: 'hoy', label: 'Hoy' },
      { value: 'semana', label: 'Esta semana' },
      { value: 'mes', label: 'Este mes' },
      { value: 'anio', label: 'Este año' }
    ];

    const serviciosFiltrados = computed(() => {
      return servicios.value.filter(servicio => {
        const coincideEstado = !filtroEstado.value || servicio.estado === filtroEstado.value;
        const coincideBusqueda = servicio.tipo.toLowerCase().includes(busqueda.value.toLowerCase()) ||
                                servicio.cliente.nombre.toLowerCase().includes(busqueda.value.toLowerCase());
        return coincideEstado && coincideBusqueda;
      });
    });

    const verDetalles = (servicio) => {
      servicioDetalle.value = servicio;
      mostrarDetalles.value = true;
    };

    const generarPDF = (servicio) => {
      const url = `https://toyotaback.onrender.com/api/ordenes-servicio/${servicio.id}/pdf`;
      window.open(url, '_blank');
    };

    const exportarServicios = async () => {
      alert('Funcionalidad de exportar Excel aún no implementada para órdenes de servicio.');
    };

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
        case 'pendiente':
          return 'px-2 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-800';
        default:
          return 'px-2 py-1 rounded-full text-xs font-semibold bg-gray-300 text-gray-900';
      }
    };

    const tarjetas = computed(() => [
      {
        titulo: 'Servicios Totales',
        valor: estadisticas.value.total,
        icon: '⚡',
        bg: 'bg-gray-700',
        iconBg: 'bg-blue-500'
      },
      {
        titulo: 'Abiertas',
        valor: estadisticas.value.abiertas,
        icon: '⏰',
        bg: 'bg-gray-700',
        iconBg: 'bg-yellow-500'
      },
      {
        titulo: 'En Progreso',
        valor: estadisticas.value.enProgreso,
        icon: '⚙️',
        bg: 'bg-gray-700',
        iconBg: 'bg-blue-500'
      },
      {
        titulo: 'Finalizadas',
        valor: estadisticas.value.finalizadas,
        icon: '✅',
        bg: 'bg-gray-700',
        iconBg: 'bg-green-500'
      },
      {
        titulo: 'Pendientes',
        valor: estadisticas.value.pendientes,
        icon: '📥',
        bg: 'bg-gray-700',
        iconBg: 'bg-gray-500'
      }
    ]);

    onMounted(() => {
      cargarServicios();
    });

    return {
      mostrarDetalles,
      servicioDetalle,
      busqueda,
      filtroEstado,
      filtroPeriodo,
      servicios,
      estadisticas,
      paginacion,
      serviciosFiltrados,
      cargando,
      error,
      verDetalles,
      generarPDF,
      exportarServicios,
      cambiarPagina,
      badgeEstado,
      tarjetas,
      estadosDisponibles,
      periodosDisponibles
    };
  }
};
</script>