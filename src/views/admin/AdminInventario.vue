<template>
  <div class="flex flex-col w-full px-6">
    <section class="grid grid-cols-1 gap-8 px-8 md:grid-cols-1">
      <div class="bg-gray-800 md:col-span-1">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h2 class="text-2xl font-bold tracking-tight text-white">Inventario de Piezas y Herramientas</h2>
          
          <!-- Pestañas para cambiar entre piezas y herramientas -->
          <div class="mt-6 border-b border-gray-600">
            <nav class="flex space-x-8">
              <button 
                @click="tipoInventario = 'piezas'" 
                class="px-1 py-4 text-sm font-medium border-b-2 transition-colors duration-200" 
                :class="tipoInventario === 'piezas' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-400 hover:text-gray-300'"
              >
                Piezas
              </button>
              <button 
                @click="tipoInventario = 'herramientas'" 
                class="px-1 py-4 text-sm font-medium border-b-2 transition-colors duration-200" 
                :class="tipoInventario === 'herramientas' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-400 hover:text-gray-300'"
              >
                Herramientas
              </button>
              <button 
                @click="tipoInventario = 'prestamos'" 
                class="px-1 py-4 text-sm font-medium border-b-2 transition-colors duration-200" 
                :class="tipoInventario === 'prestamos' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-400 hover:text-gray-300'"
              >
                Préstamos Activos
              </button>
            </nav>
          </div>
          
          <!-- Contenido de inventario de piezas -->
          <div v-if="tipoInventario === 'piezas'" class="mt-6 bg-gray-700 rounded-lg p-6">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <div class="flex flex-col md:flex-row gap-4">
                <div class="relative">
                  <input 
                    type="text" 
                    v-model="busqueda"
                    placeholder="Buscar pieza..." 
                    class="w-full rounded-md bg-gray-600 border-gray-500 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                  <svg class="absolute right-3 top-3 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                
                <select v-model="filtroCategoria" @change="cargarArticulos" class="rounded-md bg-gray-600 border-gray-500 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Todas las categorías</option>
                  <option value="motor">Motor</option>
                  <option value="suspensión">Suspensión</option>
                  <option value="frenos">Frenos</option>
                  <option value="electrico">Sistema Eléctrico</option>
                  <option value="filtros">Filtros</option>
                </select>
                
                <select v-model="filtroEstado" class="rounded-md bg-gray-600 border-gray-500 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Todos los estados</option>
                  <option value="disponible">Disponible</option>
                  <option value="bajo">Stock Bajo</option>
                  <option value="agotado">Agotado</option>
                </select>
              </div>
              
              <div class="flex gap-2">
                <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center">
                  <svg class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Exportar
                </button>
                
                <button 
                  @click="mostrarFormularioPieza = true" 
                  class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
                >
                  <svg class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Añadir Pieza
                </button>
              </div>
            </div>
            
            <!-- Tabla de piezas -->
            <div class="overflow-x-auto">
              <div v-if="loading" class="text-center py-4">
                <span class="text-white">Cargando...</span>
              </div>
              <div v-else-if="error" class="text-center py-4">
                <span class="text-red-500">{{ error }}</span>
              </div>
              <table v-else class="min-w-full bg-gray-600 rounded-lg overflow-hidden">
                <thead class="bg-gray-700">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Código</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nombre</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Categoría</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Stock</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Precio Venta</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Estado</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-500">
                  <tr v-for="articulo in articulosFiltrados" :key="articulo.articulo_id" class="hover:bg-gray-500">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">{{ articulo.codigo }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">{{ articulo.nombre }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">{{ articulo.categoria }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {{ articulo.stock_actual }} / {{ articulo.stock_maximo }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">${{ articulo.precio_venta }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span 
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                        :class="{
                          'bg-green-100 text-green-800': articulo.stock_actual > articulo.stock_minimo,
                          'bg-yellow-100 text-yellow-800': articulo.stock_actual <= articulo.stock_minimo && articulo.stock_actual > 0,
                          'bg-red-100 text-red-800': articulo.stock_actual === 0
                        }"
                      >
                        {{ articulo.stock_actual > articulo.stock_minimo ? 'Disponible' : 
                           articulo.stock_actual === 0 ? 'Agotado' : 'Stock Bajo' }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white flex gap-2">
                      <button @click="editarArticulo(articulo)" class="hover:text-blue-300" title="Editar">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.5 19.213l-4 1 1-4 12.362-12.726z" />
                        </svg>
                      </button>
                      <button @click="abrirModalAgregarStock(articulo)" class="hover:text-green-300" title="Agregar stock">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="#22c55e"/>
                          <path stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 8v8m4-4H8"/>
                        </svg>
                      </button>
                      <button @click="abrirModalEliminar(articulo)" class="hover:text-red-300" title="Descontar stock">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="#ef4444"/>
                          <path stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M8 12h8"/>
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- Paginación -->
            <div class="flex justify-between items-center mt-6">
              <div class="text-sm text-gray-400">
                Mostrando 1-4 de 42 resultados
              </div>
              <nav class="flex items-center">
                <button class="px-3 py-1 bg-gray-600 text-white rounded-l-md hover:bg-gray-500">Anterior</button>
                <button class="px-3 py-1 bg-blue-600 text-white">1</button>
                <button class="px-3 py-1 bg-gray-600 text-white hover:bg-gray-500">2</button>
                <button class="px-3 py-1 bg-gray-600 text-white hover:bg-gray-500">3</button>
                <button class="px-3 py-1 bg-gray-600 text-white rounded-r-md hover:bg-gray-500">Siguiente</button>
              </nav>
            </div>
            
            <!-- Formulario modal para añadir/editar pieza -->
            <div v-if="mostrarFormularioPieza" class="fixed inset-0 flex items-center justify-center z-50">
              <div class="absolute inset-0 bg-black opacity-50" @click="mostrarFormularioPieza = false"></div>
              <div class="relative bg-gray-800 max-w-md w-full mx-auto rounded-lg shadow-lg p-6 max-h-[80vh] overflow-y-auto">
                <button @click="mostrarFormularioPieza = false" class="absolute top-4 right-4 text-gray-400 hover:text-white">
                  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <h3 class="text-xl font-medium text-white mb-4">{{ editando ? 'Editar Pieza' : 'Añadir Nueva Pieza' }}</h3>
                
                <form @submit.prevent="editando ? actualizarPieza() : guardarPieza()" class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-400 mb-1">Código</label>
                    <input type="text" v-model="nuevaPieza.codigo" class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-400 mb-1">Nombre</label>
                    <input type="text" v-model="nuevaPieza.nombre" class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-400 mb-1">Descripción</label>
                    <textarea v-model="nuevaPieza.descripcion" rows="3" class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-400 mb-1">Categoría</label>
                      <select v-model="nuevaPieza.categoria" class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                        <option value="">Selecciona una categoría</option>
                        <option value="Motor">Motor</option>
                        <option value="Suspensión">Suspensión</option>
                        <option value="Frenos">Frenos</option>
                        <option value="Eléctrico">Sistema Eléctrico</option>
                        <option value="Filtros">Filtros</option>
                        <option value="Lubricantes">Lubricantes</option>
                      </select>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-400 mb-1">Subcategoría</label>
                      <input type="text" v-model="nuevaPieza.subcategoria" class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-400 mb-1">Marca</label>
                      <input type="text" v-model="nuevaPieza.marca" class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-400 mb-1">Modelo</label>
                      <input type="text" v-model="nuevaPieza.modelo" class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-400 mb-1">Stock Actual</label>
                      <input type="number" v-model="nuevaPieza.stock_actual" min="0" class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-400 mb-1">Stock Mínimo</label>
                      <input type="number" v-model="nuevaPieza.stock_minimo" min="1" class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-400 mb-1">Stock Máximo</label>
                      <input type="number" v-model="nuevaPieza.stock_maximo" min="1" class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-400 mb-1">Unidad de Medida</label>
                      <select v-model="nuevaPieza.unidad_medida" class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                        <option value="">Selecciona una unidad</option>
                        <option value="unidad">Unidad</option>
                        <option value="kg">Kilogramo</option>
                        <option value="l">Litro</option>
                        <option value="m">Metro</option>
                      </select>
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-400 mb-1">Precio de Compra</label>
                      <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span class="text-gray-400">$</span>
                        </div>
                        <input type="number" v-model="nuevaPieza.precio_compra" min="0" step="0.01" class="w-full rounded-md bg-gray-700 border-gray-600 text-white pl-7 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                      </div>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-400 mb-1">Precio de Venta</label>
                      <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span class="text-gray-400">$</span>
                        </div>
                        <input type="number" v-model="nuevaPieza.precio_venta" min="0" step="0.01" class="w-full rounded-md bg-gray-700 border-gray-600 text-white pl-7 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                      </div>
                    </div>
                  </div>

                  <div class="flex justify-end space-x-3 mt-6">
                    <button 
                      type="button" 
                      @click="mostrarFormularioPieza = false" 
                      class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500"
                    >
                      Cancelar
                    </button>
                    <button 
                      type="submit" 
                      class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Guardar
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div v-if="exito" class="fixed top-5 right-5 z-50 bg-green-600 text-white px-6 py-3 rounded shadow-lg flex items-center gap-2">
              <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
              <span>Pieza agregada exitosamente</span>
            </div>
          </div>
          
          <!-- Contenido de inventario de herramientas -->
          <div v-if="tipoInventario === 'herramientas'" class="mt-6 bg-gray-700 rounded-lg p-6">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <div class="flex flex-col md:flex-row gap-4">
                <div class="relative">
                  <input 
                    type="text" 
                    v-model="busquedaHerramientas"
                    placeholder="Buscar herramienta..." 
                    class="w-full rounded-md bg-gray-600 border-gray-500 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                  <svg class="absolute right-3 top-3 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                
                <select v-model="filtroTipoHerramienta" class="rounded-md bg-gray-600 border-gray-500 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Todos los tipos</option>
                  <option value="manual">Herramientas Manuales</option>
                  <option value="electrica">Herramientas Eléctricas</option>
                  <option value="medicion">Instrumentos de Medición</option>
                  <option value="diagnostico">Diagnóstico</option>
                </select>
                
                <select v-model="filtroEstadoHerramienta" class="rounded-md bg-gray-600 border-gray-500 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Todos los estados</option>
                  <option value="disponible">Disponible</option>
                  <option value="prestado">Prestado</option>
                </select>
              </div>
              
              <div class="flex gap-2">                
                <button 
                  @click="() => { mostrarFormularioHerramienta = true; editandoHerramienta = false; nuevaHerramienta = { nombre: '', tipo: '', descripcion: '', estado: 'disponible', ultima_actualizacion: new Date().toISOString() }; }"
                  class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
                >
                  <svg class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Añadir Herramienta
                </button>
              </div>
            </div>
            
            <!-- Tabla de herramientas -->
            <div class="overflow-x-auto">
              <div v-if="cargandoHerramientas" class="text-center py-4">
                <span class="text-white">Cargando...</span>
              </div>
              <div v-else-if="errorHerramientas" class="text-center py-4">
                <span class="text-red-500">{{ errorHerramientas }}</span>
              </div>
              <table v-else class="min-w-full bg-gray-600 rounded-lg overflow-hidden">
                <thead class="bg-gray-700">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nombre</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tipo</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Stock</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Estado</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Último Préstamo</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-500">
                  <tr v-for="herramienta in herramientasFiltradas" :key="herramienta.id" class="hover:bg-gray-500">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">{{ herramienta.id }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">{{ herramienta.nombre }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">{{ herramienta.subcategoria || herramienta.tipo }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">{{ herramienta.stock_actual }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                        :class="{
                          'bg-green-100 text-green-800': herramienta.stock_actual > 0,
                          'bg-yellow-100 text-yellow-800': herramienta.stock_actual === 0
                        }"
                      >
                        {{ herramienta.stock_actual > 0 ? 'Disponible' : 'Prestado' }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">03/05/2025</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white flex gap-2">
                      <button @click="editarHerramienta(herramienta)" class="hover:text-yellow-300" title="Editar">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.5 19.213l-4 1 1-4 12.362-12.726z" />
                        </svg>
                      </button>
                      <button @click="abrirModalAgregarStockHerramienta(herramienta)" class="hover:text-green-300" title="Agregar stock">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="#22c55e"/>
                          <path stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 8v8m4-4H8"/>
                        </svg>
                      </button>
                      <button @click="abrirModalRestarStockHerramienta(herramienta)" class="hover:text-red-300" title="Restar stock">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="#ef4444"/>
                          <path stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M8 12h8"/>
                        </svg>
                      </button>
                      <button @click="abrirModalPrestarHerramienta(herramienta)" class="hover:text-blue-400" title="Prestar">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17l9-5-9-5v10z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- Paginación -->
            <div class="flex justify-between items-center mt-6">
              <div class="text-sm text-gray-400">
                Mostrando 1-3 de 18 resultados
              </div>
              <nav class="flex items-center">
                <button class="px-3 py-1 bg-gray-600 text-white rounded-l-md hover:bg-gray-500">Anterior</button>
                <button class="px-3 py-1 bg-blue-600 text-white">1</button>
                <button class="px-3 py-1 bg-gray-600 text-white hover:bg-gray-500">2</button>
                <button class="px-3 py-1 bg-gray-600 text-white hover:bg-gray-500">3</button>
                <button class="px-3 py-1 bg-gray-600 text-white rounded-r-md hover:bg-gray-500">Siguiente</button>
              </nav>
            </div>
            
            <!-- Formulario modal para añadir/editar herramienta -->
            <div v-if="mostrarFormularioHerramienta" class="fixed inset-0 flex items-center justify-center z-50">
              <div class="absolute inset-0 bg-black opacity-50" @click="() => { mostrarFormularioHerramienta = false; editandoHerramienta = false; }"></div>
              <div class="relative bg-gray-800 max-w-md w-full mx-auto rounded-lg shadow-lg p-6 max-h-[80vh] overflow-y-auto">
                <button @click="() => { mostrarFormularioHerramienta = false; editandoHerramienta = false; }" class="absolute top-4 right-4 text-gray-400 hover:text-white">
                  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <h3 class="text-xl font-medium text-white mb-4">{{ editandoHerramienta ? 'Editar Herramienta' : 'Añadir Nueva Herramienta' }}</h3>
                
                <form @submit.prevent="() => { console.log('Submit formulario herramienta', nuevaHerramienta); editandoHerramienta ? actualizarHerramienta() : guardarHerramienta(); }" class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-400 mb-1">Nombre</label>
                    <input type="text" v-model="nuevaHerramienta.nombre" class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-400 mb-1">Tipo</label>
                    <select v-model="nuevaHerramienta.tipo" class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                      <option value="">Selecciona un tipo</option>
                      <option value="Manual">Herramientas Manuales</option>
                      <option value="Eléctrica">Herramientas Eléctricas</option>
                      <option value="Medición">Instrumentos de Medición</option>
                      <option value="Diagnóstico">Diagnóstico</option>
                    </select>
                  </div>
                  
                  <div class="flex justify-end space-x-3 mt-6">
                    <button 
                      type="button" 
                      @click="() => { mostrarFormularioHerramienta = false; editandoHerramienta = false; }" 
                      class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500"
                    >
                      Cancelar
                    </button>
                    <button 
                      type="submit" 
                      class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Guardar
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
            <!-- Modal para registrar préstamo de herramienta -->
            <div v-if="mostrarModalPrestamo" class="fixed inset-0 flex items-center justify-center z-50">
              <div class="absolute inset-0 bg-black opacity-50" @click="mostrarModalPrestamo = false"></div>
              <div class="relative bg-gray-800 max-w-md w-full mx-auto rounded-lg shadow-lg p-6 max-h-[80vh] overflow-y-auto">
                <button @click="mostrarModalPrestamo = false" class="absolute top-4 right-4 text-gray-400 hover:text-white">
                  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <h3 class="text-xl font-medium text-white mb-4">Registrar Préstamo</h3>
                
                <form @submit.prevent="registrarPrestamo" class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-400 mb-1">Herramienta</label>
                    <input type="text" v-model="prestamo.herramientaNombre" class="w-full rounded-md bg-gray-600 border-gray-500 text-white px-4 py-2" disabled>
                    <input type="hidden" v-model="prestamo.herramientaId">
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-400 mb-1">Usuario</label>
                    <select v-model="prestamo.usuario" class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                      <option value="">Selecciona un usuario</option>
                      <option value="Luis González">Luis González</option>
                      <option value="María García">María García</option>
                      <option value="Carlos Rodríguez">Carlos Rodríguez</option>
                      <option value="Ana López">Ana López</option>
                    </select>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-400 mb-1">Fecha y Hora de Préstamo</label>
                    <input type="datetime-local" v-model="prestamo.fechaHora" class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-400 mb-1">Notas</label>
                    <textarea v-model="prestamo.notas" rows="3" class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                  </div>
                  
                  <div class="flex justify-end space-x-3 mt-6">
                    <button 
                      type="button" 
                      @click="mostrarModalPrestamo = false" 
                      class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500"
                    >
                      Cancelar
                    </button>
                    <button 
                      type="submit" 
                      class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Registrar Préstamo
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div v-if="mostrarModalPrestarHerramienta" class="fixed inset-0 flex items-center justify-center z-50">
              <div class="absolute inset-0 bg-black opacity-50" @click="cerrarModalPrestarHerramienta"></div>
              <div class="relative bg-gray-800 max-w-md w-full mx-auto rounded-lg shadow-lg p-6 max-h-[80vh] overflow-y-auto">
                <button @click="cerrarModalPrestarHerramienta" class="absolute top-4 right-4 text-gray-400 hover:text-white">
                  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <h3 class="text-xl font-medium text-white mb-4">Registrar Préstamo de Herramienta</h3>
                <div v-if="errorPrestamoHerramienta" class="text-red-500 mb-2">{{ errorPrestamoHerramienta }}</div>
                <form @submit.prevent="confirmarPrestamoHerramienta" class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-400 mb-1">Usuario (Mecánico)</label>
                    <select v-model="prestamoHerramienta.usuario" @change="errorPrestamoHerramienta = ''" class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                      <option value="">Selecciona un mecánico</option>
                      <option v-for="mecanico in mecanicos" :key="mecanico.id" :value="mecanico.id">{{ mecanico.nombre }}</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-400 mb-1">Fecha de Préstamo</label>
                    <input type="date" v-model="prestamoHerramienta.fecha" @input="errorPrestamoHerramienta = ''" class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                  </div>
                  <div class="flex justify-end space-x-3 mt-6">
                    <button type="button" @click="cerrarModalPrestarHerramienta" class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500">Cancelar</button>
                    <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Prestar</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          <!-- Contenido de préstamos activos -->
          <div v-if="tipoInventario === 'prestamos'" class="mt-6 bg-gray-700 rounded-lg p-6">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <div class="flex flex-col md:flex-row gap-4">
                <div class="relative">
                  <input 
                    type="text" 
                    placeholder="Buscar por herramienta o usuario..." 
                    class="w-full rounded-md bg-gray-600 border-gray-500 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                  <svg class="absolute right-3 top-3 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                
                <select class="rounded-md bg-gray-600 border-gray-500 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Todos los usuarios</option>
                  <option value="Luis González">Luis González</option>
                  <option value="María García">María García</option>
                  <option value="Carlos Rodríguez">Carlos Rodríguez</option>
                  <option value="Ana López">Ana López</option>
                </select>
              </div>
              
              <div class="flex gap-2">                
                <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center">
                  <svg class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Exportar Reporte
                </button>
              </div>
            </div>
            
            <!-- Tabla de préstamos activos -->
            <div class="overflow-x-auto">
              <table class="min-w-full bg-gray-600 rounded-lg overflow-hidden">
                <thead class="bg-gray-700">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID Herramienta</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Herramienta</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Usuario</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Fecha Préstamo</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Estado</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-500">
                  <tr class="hover:bg-gray-500">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">H002</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Escáner OBD2</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Carlos Rodríguez</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">05/05/2025 14:30</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Prestado</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">
                      <button @click="registrarDevolucion('H002')" class="text-green-400 hover:text-green-300 mr-2">Devolver</button>
                      <button class="text-blue-400 hover:text-blue-300">Ver Detalles</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- Paginación -->
            <div class="flex justify-between items-center mt-6">
              <div class="text-sm text-gray-400">
                Mostrando 1-1 de 1 resultados
              </div>
              <nav class="flex items-center">
                <button class="px-3 py-1 bg-gray-600 text-white rounded-l-md hover:bg-gray-500">Anterior</button>
                <button class="px-3 py-1 bg-blue-600 text-white">1</button>
                <button class="px-3 py-1 bg-gray-600 text-white rounded-r-md hover:bg-gray-500">Siguiente</button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <div v-if="mostrarModalEliminar" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="absolute inset-0 bg-black opacity-50" @click="cerrarModalEliminar"></div>
    <div class="relative bg-gray-800 max-w-md w-full mx-auto rounded-lg shadow-lg p-6 max-h-[80vh] overflow-y-auto">
      <button @click="cerrarModalEliminar" class="absolute top-4 right-4 text-gray-400 hover:text-white">
        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <h3 class="text-xl font-medium text-white mb-4">Descontar stock</h3>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-400 mb-1">Cantidad a descontar (máx: {{ articuloSeleccionado?.stock_actual }})</label>
        <input type="number" v-model.number="cantidadAEliminar" :max="articuloSeleccionado?.stock_actual" min="1" class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
      </div>
      <div v-if="errorEliminar" class="text-red-500 mb-2">{{ errorEliminar }}</div>
      <div class="flex justify-end space-x-3 mt-6">
        <button type="button" @click="cerrarModalEliminar" class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500">Cancelar</button>
        <button type="button" @click="confirmarEliminar" class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Descontar</button>
      </div>
    </div>
  </div>
  <div v-if="mostrarModalAgregarStock" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="absolute inset-0 bg-black opacity-50" @click="cerrarModalAgregarStock"></div>
    <div class="relative bg-gray-800 max-w-md w-full mx-auto rounded-lg shadow-lg p-6 max-h-[80vh] overflow-y-auto">
      <button @click="cerrarModalAgregarStock" class="absolute top-4 right-4 text-gray-400 hover:text-white">
        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <h3 class="text-xl font-medium text-white mb-4">Agregar stock</h3>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-400 mb-1">Cantidad a agregar</label>
        <input type="number" v-model.number="cantidadAAgregar" min="1" class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
      </div>
      <div v-if="errorAgregar" class="text-red-500 mb-2">{{ errorAgregar }}</div>
      <div class="flex justify-end space-x-3 mt-6">
        <button type="button" @click="cerrarModalAgregarStock" class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500">Cancelar</button>
        <button type="button" @click="confirmarAgregarStock" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Agregar</button>
      </div>
    </div>
  </div>
  <div v-if="mostrarModalAgregarStockHerramienta" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="absolute inset-0 bg-black opacity-50" @click="cerrarModalAgregarStockHerramienta"></div>
    <div class="relative bg-gray-800 max-w-md w-full mx-auto rounded-lg shadow-lg p-6 max-h-[80vh] overflow-y-auto">
      <button @click="cerrarModalAgregarStockHerramienta" class="absolute top-4 right-4 text-gray-400 hover:text-white">
        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <h3 class="text-xl font-medium text-white mb-4">Agregar stock a herramienta</h3>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-400 mb-1">Cantidad a agregar</label>
        <input type="number" v-model.number="cantidadAgregarStockHerramienta" min="1" class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
      </div>
      <div class="flex justify-end space-x-3 mt-6">
        <button type="button" @click="cerrarModalAgregarStockHerramienta" class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500">Cancelar</button>
        <button type="button" @click="confirmarAgregarStockHerramienta" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Agregar</button>
      </div>
    </div>
  </div>
  <div v-if="mostrarModalRestarStockHerramienta" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="absolute inset-0 bg-black opacity-50" @click="cerrarModalRestarStockHerramienta"></div>
    <div class="relative bg-gray-800 max-w-md w-full mx-auto rounded-lg shadow-lg p-6 max-h-[80vh] overflow-y-auto">
      <button @click="cerrarModalRestarStockHerramienta" class="absolute top-4 right-4 text-gray-400 hover:text-white">
        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <h3 class="text-xl font-medium text-white mb-4">Restar stock a herramienta</h3>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-400 mb-1">Cantidad a restar (máx: {{ herramientaSeleccionadaStock?.stock_actual }})</label>
        <input type="number" v-model.number="cantidadRestarStockHerramienta" :max="herramientaSeleccionadaStock?.stock_actual" min="1" class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
      </div>
      <div class="flex justify-end space-x-3 mt-6">
        <button type="button" @click="cerrarModalRestarStockHerramienta" class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500">Cancelar</button>
        <button type="button" @click="confirmarRestarStockHerramienta" class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Restar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { inventarioService } from '@/services/inventarioService';
import { notificacionStore } from '../../components/stores/notificacion';
import axios from 'axios';

export default {
  name: 'AdminInventario',
  setup() {
    const tipoInventario = ref('piezas');
    const mostrarFormularioPieza = ref(false);
    const mostrarFormularioHerramienta = ref(false);
    const mostrarModalPrestamo = ref(false);
    const exito = ref(false);
    const articulos = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const filtroCategoria = ref('');
    const filtroEstado = ref('');
    const busqueda = ref('');
    
    const nuevaPieza = ref({
      codigo: '',
      nombre: '',
      descripcion: '',
      categoria: '',
      subcategoria: '',
      marca: '',
      modelo: '',
      stock_actual: 0,
      stock_minimo: 5,
      stock_maximo: 100,
      unidad_medida: '',
      precio_compra: 0,
      precio_venta: 0
    });
    
    const herramientas = ref([]);
    const cargandoHerramientas = ref(true);
    const errorHerramientas = ref(null);
    const busquedaHerramientas = ref('');
    const filtroTipoHerramienta = ref('');
    const filtroEstadoHerramienta = ref('');
    const nuevaHerramienta = ref({
      nombre: '',
      tipo: '',
      descripcion: '',
      estado: 'disponible',
      ultima_actualizacion: new Date().toISOString()
    });
    
    const prestamo = ref({
      herramientaId: '',
      herramientaNombre: '',
      usuario: '',
      fechaHora: '',
      notas: ''
    });

    const mostrarModalEliminar = ref(false);
    const articuloSeleccionado = ref(null);
    const cantidadAEliminar = ref(1);
    const errorEliminar = ref('');

    const editando = ref(false);
    let idEditando = null;
    const mostrarModalAgregarStock = ref(false);
    const articuloAgregarStock = ref(null);
    const cantidadAAgregar = ref(1);
    const errorAgregar = ref('');

    const editandoHerramienta = ref(false);
    let idHerramientaEditando = null;

    const mostrarModalAgregarStockHerramienta = ref(false);
    const mostrarModalRestarStockHerramienta = ref(false);
    const herramientaSeleccionadaStock = ref(null);
    const cantidadAgregarStockHerramienta = ref(1);
    const cantidadRestarStockHerramienta = ref(1);

    const mostrarModalPrestarHerramienta = ref(false);
    const prestamoHerramienta = ref({ usuario: '', fecha: '' });
    const herramientaSeleccionadaPrestamo = ref(null);
    const errorPrestamoHerramienta = ref('');
    const mecanicos = ref([]);

    // Cargar artículos al montar el componente
    const cargarArticulos = async () => {
      loading.value = true;
      try {
        if (filtroCategoria.value) {
          articulos.value = await inventarioService.getArticulosByCategoria(filtroCategoria.value);
        } else {
          articulos.value = await inventarioService.getAllArticulos();
        }
      } catch (err) {
        error.value = 'Error al cargar los artículos';
        console.error(err);
      } finally {
        loading.value = false;
      }
    };

    // Filtrar artículos
    const articulosFiltrados = computed(() => {
      return articulos.value.filter(articulo => {
        const coincideBusqueda = articulo.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
                                articulo.codigo.toLowerCase().includes(busqueda.value.toLowerCase());
        
        const coincideEstado = !filtroEstado.value || 
          (filtroEstado.value === 'disponible' && articulo.stock_actual > articulo.stock_minimo) ||
          (filtroEstado.value === 'bajo' && articulo.stock_actual <= articulo.stock_minimo && articulo.stock_actual > 0) ||
          (filtroEstado.value === 'agotado' && articulo.stock_actual === 0);

        return coincideBusqueda && coincideEstado;
      });
    });
    
    const guardarPieza = async () => {
      try {
        await inventarioService.createArticulo(nuevaPieza.value);
        await cargarArticulos();
        mostrarFormularioPieza.value = false;
        notificacionStore.mostrar('Pieza agregada exitosamente', 'success');
        nuevaPieza.value = {
          codigo: '',
          nombre: '',
          descripcion: '',
          categoria: '',
          subcategoria: '',
          marca: '',
          modelo: '',
          stock_actual: 0,
          stock_minimo: 5,
          stock_maximo: 100,
          unidad_medida: '',
          precio_compra: 0,
          precio_venta: 0
        };
      } catch (err) {
        notificacionStore.mostrar('Error al guardar la pieza', 'error');
        console.error(err);
      }
    };
    
    const guardarHerramienta = async () => {
      console.log('Intentando guardar herramienta', nuevaHerramienta.value);
      try {
        const herramientaData = {
          codigo: `H${Date.now().toString().slice(-4)}`,
          nombre: nuevaHerramienta.value.nombre,
          descripcion: nuevaHerramienta.value.descripcion || '',
          categoria: 'herramientas',
          subcategoria: nuevaHerramienta.value.tipo,
          stock_actual: 1,
          stock_minimo: 1,
          stock_maximo: 1,
          unidad_medida: 'unidad',
          precio_compra: 0,
          precio_venta: 0
        };

        await axios.post('/api/inventario', herramientaData);
        await cargarHerramientas();
        mostrarFormularioHerramienta.value = false;
        notificacionStore.mostrar('Herramienta agregada exitosamente', 'success');
        nuevaHerramienta.value = {
          nombre: '',
          tipo: '',
          descripcion: '',
          estado: 'disponible',
          ultima_actualizacion: new Date().toISOString()
        };
      } catch (err) {
        notificacionStore.mostrar('Error al guardar la herramienta', 'error');
        console.error('Error:', err);
      }
    };
    
    const abrirModalEliminar = (articulo) => {
      articuloSeleccionado.value = articulo;
      cantidadAEliminar.value = 1;
      errorEliminar.value = '';
      mostrarModalEliminar.value = true;
    };

    const cerrarModalEliminar = () => {
      mostrarModalEliminar.value = false;
      articuloSeleccionado.value = null;
      cantidadAEliminar.value = 1;
      errorEliminar.value = '';
    };

    const confirmarEliminar = async () => {
      if (!cantidadAEliminar.value || cantidadAEliminar.value < 1) {
        errorEliminar.value = 'Debes ingresar una cantidad válida.';
        return;
      }
      if (cantidadAEliminar.value > articuloSeleccionado.value.stock_actual) {
        errorEliminar.value = 'No puedes eliminar más piezas de las que hay en stock.';
        return;
      }
      try {
        if (cantidadAEliminar.value === articuloSeleccionado.value.stock_actual) {
          await inventarioService.deleteArticulo(articuloSeleccionado.value.articulo_id);
          notificacionStore.mostrar('Pieza eliminada exitosamente', 'success');
        } else {
          await inventarioService.updateStock(articuloSeleccionado.value.articulo_id, -cantidadAEliminar.value);
          notificacionStore.mostrar('Stock descontado exitosamente', 'success');
        }
        await cargarArticulos();
        cerrarModalEliminar();
      } catch (err) {
        notificacionStore.mostrar('Error al descontar stock', 'error');
        errorEliminar.value = 'Error al descontar stock';
        console.error(err);
      }
    };

    const editarArticulo = (articulo) => {
      nuevaPieza.value = { ...articulo };
      editando.value = true;
      idEditando = articulo.articulo_id;
      mostrarFormularioPieza.value = true;
    };
    
    const abrirPrestamoModal = (id, nombre) => {
      prestamo.value.herramientaId = id;
      prestamo.value.herramientaNombre = nombre;
      prestamo.value.fechaHora = new Date().toISOString().slice(0, 16);
      mostrarModalPrestamo.value = true;
    };
    
    const registrarPrestamo = async () => {
      try {
        const movimientoData = {
          articulo_id: prestamo.value.herramientaId,
          tipo_movimiento: 'prestamo',
          cantidad: 1,
          usuario_id: prestamo.value.usuario,
          motivo: 'Préstamo de herramienta',
          notas: prestamo.value.notas
        };

        await axios.post('/api/movimientos-inventario', movimientoData);
        
        // Actualizar estado de la herramienta
        await axios.patch(`/api/inventario/${prestamo.value.herramientaId}/stock`, {
          cantidad: -1
        });

        await cargarHerramientas();
        mostrarModalPrestamo.value = false;
        notificacionStore.mostrar('Préstamo registrado exitosamente', 'success');
        
        // Limpiar formulario
        prestamo.value = {
          herramientaId: '',
          herramientaNombre: '',
          usuario: '',
          fechaHora: '',
          notas: ''
        };
      } catch (err) {
        notificacionStore.mostrar('Error al registrar el préstamo', 'error');
        console.error('Error:', err);
      }
    };
    
    const registrarDevolucion = async (herramientaId) => {
      try {
        const movimientoData = {
          articulo_id: herramientaId,
          tipo_movimiento: 'devolucion',
          cantidad: 1,
          usuario_id: prestamo.value.usuario,
          motivo: 'Devolución de herramienta',
          notas: 'Devolución de herramienta prestada'
        };

        await axios.post('/api/movimientos-inventario', movimientoData);
        
        // Actualizar estado de la herramienta
        await axios.patch(`/api/inventario/${herramientaId}/stock`, {
          cantidad: 1
        });

        await cargarHerramientas();
        notificacionStore.mostrar('Devolución registrada exitosamente', 'success');
      } catch (err) {
        notificacionStore.mostrar('Error al registrar la devolución', 'error');
        console.error('Error:', err);
      }
    };

    const actualizarPieza = async () => {
      if (nuevaPieza.value.stock_actual > nuevaPieza.value.stock_maximo) {
        error.value = `El stock actual no puede ser mayor que el stock máximo (${nuevaPieza.value.stock_maximo}).`;
        return;
      }
      try {
        await inventarioService.updateArticulo(idEditando, nuevaPieza.value);
        await cargarArticulos();
        mostrarFormularioPieza.value = false;
        editando.value = false;
        idEditando = null;
        notificacionStore.mostrar('Pieza actualizada exitosamente', 'success');
        nuevaPieza.value = {
          codigo: '',
          nombre: '',
          descripcion: '',
          categoria: '',
          subcategoria: '',
          marca: '',
          modelo: '',
          stock_actual: 0,
          stock_minimo: 5,
          stock_maximo: 100,
          unidad_medida: '',
          precio_compra: 0,
          precio_venta: 0
        };
      } catch (err) {
        notificacionStore.mostrar('Error al actualizar la pieza', 'error');
        error.value = 'Error al actualizar la pieza';
        console.error(err);
      }
    };

    const abrirModalAgregarStock = (articulo) => {
      articuloAgregarStock.value = articulo;
      cantidadAAgregar.value = 1;
      errorAgregar.value = '';
      mostrarModalAgregarStock.value = true;
    };

    const cerrarModalAgregarStock = () => {
      mostrarModalAgregarStock.value = false;
      articuloAgregarStock.value = null;
      cantidadAAgregar.value = 1;
      errorAgregar.value = '';
    };

    const confirmarAgregarStock = async () => {
      if (!cantidadAAgregar.value || cantidadAAgregar.value < 1) {
        errorAgregar.value = 'Debes ingresar una cantidad válida.';
        return;
      }
      if (cantidadAAgregar.value + articuloAgregarStock.value.stock_actual > articuloAgregarStock.value.stock_maximo) {
        errorAgregar.value = `No puedes exceder el stock máximo (${articuloAgregarStock.value.stock_maximo}).`;
        return;
      }
      try {
        await inventarioService.updateStock(articuloAgregarStock.value.articulo_id, cantidadAAgregar.value);
        await cargarArticulos();
        cerrarModalAgregarStock();
        notificacionStore.mostrar('Stock agregado exitosamente', 'success');
      } catch (err) {
        notificacionStore.mostrar('Error al agregar stock', 'error');
        errorAgregar.value = 'Error al agregar stock';
        console.error(err);
      }
    };

    // Cargar herramientas
    const cargarHerramientas = async () => {
      try {
        cargandoHerramientas.value = true;
        const response = await axios.get('/api/inventario/categoria/herramientas');
        herramientas.value = response.data;
      } catch (err) {
        errorHerramientas.value = 'Error al cargar las herramientas';
        console.error('Error:', err);
      } finally {
        cargandoHerramientas.value = false;
      }
    };

    // Filtrar herramientas
    const herramientasFiltradas = computed(() => {
      return herramientas.value.filter(herramienta => {
        const coincideBusqueda = herramienta.nombre.toLowerCase().includes(busquedaHerramientas.value.toLowerCase());
        const coincideTipo = !filtroTipoHerramienta.value || (herramienta.subcategoria && herramienta.subcategoria.toLowerCase() === filtroTipoHerramienta.value.toLowerCase());
        const coincideEstado = !filtroEstadoHerramienta.value || (herramienta.estado && herramienta.estado.toLowerCase() === filtroEstadoHerramienta.value.toLowerCase());
        return coincideBusqueda && coincideTipo && coincideEstado;
      });
    });

    const editarHerramienta = (herramienta) => {
      nuevaHerramienta.value = {
        nombre: herramienta.nombre,
        tipo: herramienta.subcategoria || herramienta.tipo,
        descripcion: herramienta.descripcion || '',
        estado: herramienta.estado || 'disponible',
        ultima_actualizacion: herramienta.ultima_actualizacion || new Date().toISOString()
      };
      editandoHerramienta.value = true;
      idHerramientaEditando = herramienta.id || herramienta.articulo_id;
      mostrarFormularioHerramienta.value = true;
    };

    const actualizarHerramienta = async () => {
      try {
        const herramientaData = {
          nombre: nuevaHerramienta.value.nombre,
          descripcion: nuevaHerramienta.value.descripcion || '',
          categoria: 'herramientas',
          subcategoria: nuevaHerramienta.value.tipo,
          stock_actual: 1,
          stock_minimo: 1,
          stock_maximo: 1,
          unidad_medida: 'unidad',
          precio_compra: 0,
          precio_venta: 0,
          estado: nuevaHerramienta.value.estado,
          ultima_actualizacion: new Date().toISOString()
        };
        await axios.put(`/api/inventario/${idHerramientaEditando}`, herramientaData);
        await cargarHerramientas();
        mostrarFormularioHerramienta.value = false;
        editandoHerramienta.value = false;
        idHerramientaEditando = null;
        notificacionStore.mostrar('Herramienta actualizada exitosamente', 'success');
        nuevaHerramienta.value = {
          nombre: '',
          tipo: '',
          descripcion: '',
          estado: 'disponible',
          ultima_actualizacion: new Date().toISOString()
        };
      } catch (err) {
        notificacionStore.mostrar('Error al actualizar la herramienta', 'error');
        console.error('Error:', err);
      }
    };

    const abrirModalAgregarStockHerramienta = (herramienta) => {
      herramientaSeleccionadaStock.value = herramienta;
      cantidadAgregarStockHerramienta.value = 1;
      mostrarModalAgregarStockHerramienta.value = true;
    };

    const cerrarModalAgregarStockHerramienta = () => {
      mostrarModalAgregarStockHerramienta.value = false;
      herramientaSeleccionadaStock.value = null;
      cantidadAgregarStockHerramienta.value = 1;
    };

    const confirmarAgregarStockHerramienta = async () => {
      if (!cantidadAgregarStockHerramienta.value || cantidadAgregarStockHerramienta.value < 1) return;
      try {
        await axios.patch(`/api/inventario/${herramientaSeleccionadaStock.value.id || herramientaSeleccionadaStock.value.articulo_id}/stock`, {
          cantidad: cantidadAgregarStockHerramienta.value
        });
        await cargarHerramientas();
        cerrarModalAgregarStockHerramienta();
        notificacionStore.mostrar('Stock agregado exitosamente', 'success');
      } catch (err) {
        notificacionStore.mostrar('Error al agregar stock', 'error');
        console.error(err);
      }
    };

    const abrirModalRestarStockHerramienta = (herramienta) => {
      herramientaSeleccionadaStock.value = herramienta;
      cantidadRestarStockHerramienta.value = 1;
      mostrarModalRestarStockHerramienta.value = true;
    };

    const cerrarModalRestarStockHerramienta = () => {
      mostrarModalRestarStockHerramienta.value = false;
      herramientaSeleccionadaStock.value = null;
      cantidadRestarStockHerramienta.value = 1;
    };

    const confirmarRestarStockHerramienta = async () => {
      if (!cantidadRestarStockHerramienta.value || cantidadRestarStockHerramienta.value < 1) return;
      if (cantidadRestarStockHerramienta.value > herramientaSeleccionadaStock.value.stock_actual) return;
      try {
        await axios.patch(`/api/inventario/${herramientaSeleccionadaStock.value.id || herramientaSeleccionadaStock.value.articulo_id}/stock`, {
          cantidad: -cantidadRestarStockHerramienta.value
        });
        await cargarHerramientas();
        cerrarModalRestarStockHerramienta();
        notificacionStore.mostrar('Stock descontado exitosamente', 'success');
      } catch (err) {
        notificacionStore.mostrar('Error al descontar stock', 'error');
        console.error(err);
      }
    };

    const abrirModalPrestarHerramienta = async (herramienta) => {
      herramientaSeleccionadaPrestamo.value = herramienta;
      prestamoHerramienta.value = { usuario: '', fecha: '' };
      errorPrestamoHerramienta.value = '';
      // Validar stock antes de abrir el modal
      if (!herramienta.stock_actual || herramienta.stock_actual < 1) {
        errorPrestamoHerramienta.value = 'No hay stock disponible para prestar esta herramienta.';
        mostrarModalPrestarHerramienta.value = true;
        return;
      }
      // Obtener mecánicos del backend
      try {
        const response = await axios.get('/api/usuarios?rol=mecanico');
        mecanicos.value = response.data;
      } catch (err) {
        mecanicos.value = [];
      }
      mostrarModalPrestarHerramienta.value = true;
    };
    const cerrarModalPrestarHerramienta = () => {
      mostrarModalPrestarHerramienta.value = false;
      herramientaSeleccionadaPrestamo.value = null;
      prestamoHerramienta.value = { usuario: '', fecha: '' };
      errorPrestamoHerramienta.value = '';
    };
    const confirmarPrestamoHerramienta = async () => {
      if (!prestamoHerramienta.value.usuario || !prestamoHerramienta.value.fecha) {
        errorPrestamoHerramienta.value = 'Todos los campos son obligatorios.';
        return;
      }
      if (!herramientaSeleccionadaPrestamo.value.stock_actual || herramientaSeleccionadaPrestamo.value.stock_actual < 1) {
        errorPrestamoHerramienta.value = 'No hay stock disponible para prestar esta herramienta.';
        return;
      }
      try {
        // Registrar el préstamo
        await axios.post('/api/movimientos-inventario', {
          articulo_id: herramientaSeleccionadaPrestamo.value.id || herramientaSeleccionadaPrestamo.value.articulo_id,
          tipo_movimiento: 'prestamo',
          cantidad: 1,
          usuario_id: prestamoHerramienta.value.usuario,
          motivo: 'Préstamo de herramienta',
          fecha: prestamoHerramienta.value.fecha
        });
        // Descontar stock
        await axios.patch(`/api/inventario/${herramientaSeleccionadaPrestamo.value.id || herramientaSeleccionadaPrestamo.value.articulo_id}/stock`, {
          cantidad: -1
        });
        await cargarHerramientas();
        cerrarModalPrestarHerramienta();
        notificacionStore.mostrar('Préstamo registrado exitosamente', 'success');
      } catch (err) {
        errorPrestamoHerramienta.value = 'Error al registrar el préstamo.';
        console.error(err);
      }
    };

    onMounted(() => {
      cargarArticulos();
      cargarHerramientas();
    });
    
    return {
      tipoInventario,
      mostrarFormularioPieza,
      mostrarFormularioHerramienta,
      mostrarModalPrestamo,
      exito,
      nuevaPieza,
      herramientas,
      cargandoHerramientas,
      errorHerramientas,
      busquedaHerramientas,
      filtroTipoHerramienta,
      filtroEstadoHerramienta,
      nuevaHerramienta,
      prestamo,
      articulos,
      articulosFiltrados,
      loading,
      error,
      guardarPieza,
      editarArticulo,
      abrirPrestamoModal,
      registrarPrestamo,
      registrarDevolucion,
      mostrarModalEliminar,
      articuloSeleccionado,
      cantidadAEliminar,
      errorEliminar,
      abrirModalEliminar,
      cerrarModalEliminar,
      confirmarEliminar,
      editando,
      actualizarPieza,
      abrirModalAgregarStock,
      cerrarModalAgregarStock,
      confirmarAgregarStock,
      mostrarModalAgregarStock,
      articuloAgregarStock,
      cantidadAAgregar,
      errorAgregar,
      herramientasFiltradas,
      cargarHerramientas,
      guardarHerramienta,
      editarHerramienta,
      editandoHerramienta,
      idHerramientaEditando,
      actualizarHerramienta,
      mostrarModalAgregarStockHerramienta,
      mostrarModalRestarStockHerramienta,
      herramientaSeleccionadaStock,
      cantidadAgregarStockHerramienta,
      cantidadRestarStockHerramienta,
      abrirModalAgregarStockHerramienta,
      cerrarModalAgregarStockHerramienta,
      confirmarAgregarStockHerramienta,
      abrirModalRestarStockHerramienta,
      cerrarModalRestarStockHerramienta,
      confirmarRestarStockHerramienta,
      mostrarModalPrestarHerramienta,
      prestamoHerramienta,
      herramientaSeleccionadaPrestamo,
      errorPrestamoHerramienta,
      mecanicos,
      abrirModalPrestarHerramienta,
      cerrarModalPrestarHerramienta,
      confirmarPrestamoHerramienta
    };
  }
};
</script> 