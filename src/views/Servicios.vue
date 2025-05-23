<template>
  <div class="flex flex-col w-full px-6">
    <!-- Banner Principal -->
    <section class="bg-gray-800 rounded-lg overflow-hidden mb-8">
      <div class="relative">
        <div class="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent opacity-90"></div>
        <div class="relative py-12 px-8 md:px-12 lg:px-16 z-10">
          <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">Servicios Automotrices Toyota</h1>
          <p class="text-white text-lg mb-6 max-w-2xl">Cuidamos tu vehículo con la más alta calidad y garantía. Todos nuestros servicios incluyen mano de obra certificada y refacciones originales.</p>
        </div>
      </div>
    </section>

    <!-- Navegación por Categorías -->
    <div class="mb-8">
      <div class="flex flex-wrap md:flex-nowrap gap-2 justify-center">
        <button @click="activeCategory = 'todos'" 
                :class="[activeCategory === 'todos' ? 'bg-blue-700' : 'bg-gray-700 hover:bg-blue-700', 
                'px-4 py-2 rounded-lg text-sm font-medium text-white']">
          Todos los servicios
        </button>
        <button @click="activeCategory = 'mantenimiento'" 
                :class="[activeCategory === 'mantenimiento' ? 'bg-blue-700' : 'bg-gray-700 hover:bg-blue-700', 
                'px-4 py-2 rounded-lg text-sm font-medium text-white']">
          Mantenimiento básico
        </button>
        <button @click="activeCategory = 'motor'" 
                :class="[activeCategory === 'motor' ? 'bg-blue-700' : 'bg-gray-700 hover:bg-blue-700', 
                'px-4 py-2 rounded-lg text-sm font-medium text-white']">
          Sistema de motor
        </button>
        <button @click="activeCategory = 'frenos'" 
                :class="[activeCategory === 'frenos' ? 'bg-blue-700' : 'bg-gray-700 hover:bg-blue-700', 
                'px-4 py-2 rounded-lg text-sm font-medium text-white']">
          Sistema de frenos
        </button>
        <button @click="activeCategory = 'suspension'" 
                :class="[activeCategory === 'suspension' ? 'bg-blue-700' : 'bg-gray-700 hover:bg-blue-700', 
                'px-4 py-2 rounded-lg text-sm font-medium text-white']">
          Suspensión y dirección
        </button>
      </div>
    </div>

    <!-- Sección de Servicios -->
    <section class="grid grid-cols-1 gap-8 px-4 md:px-8">
      <!-- Mostrar todas las categorías si 'todos' está seleccionado -->
      <template v-if="activeCategory === 'todos'">
        <!-- Mantenimiento básico -->
        <div class="bg-gray-800">
          <div class="mx-auto max-w-2xl px-4 py-1 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-8">
            <h2 class="text-2xl font-bold tracking-tight text-white mb-4">Mantenimiento básico</h2>
            
            <div class="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              <div v-for="servicio in serviciosPorCategoria('mantenimiento')" :key="servicio.id" 
                   class="w-full bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col cursor-pointer transition-transform duration-300 hover:scale-105"
                   @click="seleccionarServicio(servicio)">
                <div class="flex-shrink-0">
                  <div class="w-full h-48 overflow-hidden rounded-t-lg">
                    <img class="w-full h-full object-cover" :src="servicio.imagen" :alt="servicio.titulo" />
                  </div>
                </div>
                <div class="px-5 py-4 flex-grow flex flex-col">
                  <h5 class="text-xl font-semibold tracking-tight text-gray-900 h-14">{{ servicio.titulo }}</h5>
                  <p class="text-sm text-gray-600 mb-3">{{ servicio.descripcion }}</p>
                  <div class="flex items-center justify-between mt-auto">
                    <span class="text-3xl font-bold text-gray-900">${{ servicio.precio }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sistema de motor -->
        <div class="bg-gray-800 mt-12">
          <div class="mx-auto max-w-2xl px-4 py-1 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-8">
            <h2 class="text-2xl font-bold tracking-tight text-white mb-4">Sistema de motor</h2>
            
            <div class="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              <div v-for="servicio in serviciosPorCategoria('motor')" :key="servicio.id" 
                   class="w-full bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col cursor-pointer transition-transform duration-300 hover:scale-105"
                   @click="seleccionarServicio(servicio)">
                <div class="flex-shrink-0">
                  <div class="w-full h-48 overflow-hidden rounded-t-lg">
                    <img class="w-full h-full object-cover" :src="servicio.imagen" :alt="servicio.titulo" />
                  </div>
                </div>
                <div class="px-5 py-4 flex-grow flex flex-col">
                  <h5 class="text-xl font-semibold tracking-tight text-gray-900 h-14">{{ servicio.titulo }}</h5>
                  <p class="text-sm text-gray-600 mb-3">{{ servicio.descripcion }}</p>
                  <div class="flex items-center justify-between mt-auto">
                    <span class="text-3xl font-bold text-gray-900">${{ servicio.precio }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sistema de frenos -->
        <div class="bg-gray-800 mt-12">
          <div class="mx-auto max-w-2xl px-4 py-1 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-8">
            <h2 class="text-2xl font-bold tracking-tight text-white mb-4">Sistema de frenos</h2>
            
            <div class="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              <div v-for="servicio in serviciosPorCategoria('frenos')" :key="servicio.id" 
                   class="w-full bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col cursor-pointer transition-transform duration-300 hover:scale-105"
                   @click="seleccionarServicio(servicio)">
                <div class="flex-shrink-0">
                  <div class="w-full h-48 overflow-hidden rounded-t-lg">
                    <img class="w-full h-full object-cover" :src="servicio.imagen" :alt="servicio.titulo" />
                  </div>
                </div>
                <div class="px-5 py-4 flex-grow flex flex-col">
                  <h5 class="text-xl font-semibold tracking-tight text-gray-900 h-14">{{ servicio.titulo }}</h5>
                  <p class="text-sm text-gray-600 mb-3">{{ servicio.descripcion }}</p>
                  <div class="flex items-center justify-between mt-auto">
                    <span class="text-3xl font-bold text-gray-900">${{ servicio.precio }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Suspensión y dirección -->
        <div class="bg-gray-800 mt-12">
          <div class="mx-auto max-w-2xl px-4 py-1 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-8">
            <h2 class="text-2xl font-bold tracking-tight text-white mb-4">Suspensión y dirección</h2>
            
            <div class="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              <div v-for="servicio in serviciosPorCategoria('suspension')" :key="servicio.id" 
                   class="w-full bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col cursor-pointer transition-transform duration-300 hover:scale-105"
                   @click="seleccionarServicio(servicio)">
                <div class="flex-shrink-0">
                  <div class="w-full h-48 overflow-hidden rounded-t-lg">
                    <img class="w-full h-full object-cover" :src="servicio.imagen" :alt="servicio.titulo" />
                  </div>
                </div>
                <div class="px-5 py-4 flex-grow flex flex-col">
                  <h5 class="text-xl font-semibold tracking-tight text-gray-900 h-14">{{ servicio.titulo }}</h5>
                  <p class="text-sm text-gray-600 mb-3">{{ servicio.descripcion }}</p>
                  <div class="flex items-center justify-between mt-auto">
                    <span class="text-3xl font-bold text-gray-900">${{ servicio.precio }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- Mostrar solo la categoría seleccionada -->
      <template v-else>
        <div class="bg-gray-800">
          <div class="mx-auto max-w-2xl px-4 py-1 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-8">
            <h2 class="text-2xl font-bold tracking-tight text-white mb-4">{{ getCategoryTitle() }}</h2>
            
            <div class="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              <div v-for="servicio in serviciosPorCategoria(activeCategory)" :key="servicio.id" 
                   class="w-full bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col cursor-pointer transition-transform duration-300 hover:scale-105"
                   @click="seleccionarServicio(servicio)">
                <div class="flex-shrink-0">
                  <div class="w-full h-48 overflow-hidden rounded-t-lg">
                    <img class="w-full h-full object-cover" :src="servicio.imagen" :alt="servicio.titulo" />
                  </div>
                </div>
                <div class="px-5 py-4 flex-grow flex flex-col">
                  <h5 class="text-xl font-semibold tracking-tight text-gray-900 h-14">{{ servicio.titulo }}</h5>
                  <p class="text-sm text-gray-600 mb-3">{{ servicio.descripcion }}</p>
                  <div class="flex items-center justify-between mt-auto">
                    <span class="text-3xl font-bold text-gray-900">${{ servicio.precio }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </section>

    <!-- Modal -->
    <div v-if="servicioSeleccionado" 
         class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-all duration-500 ease-in-out"
         @click="cerrarModal">
      <div class="bg-white rounded-xl p-8 max-w-3xl w-full mx-4 transform transition-all duration-500 ease-in-out scale-100 shadow-2xl"
           @click.stop>
        <div class="relative">
          <button @click="cerrarModal" 
                  class="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors duration-200">
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div class="flex flex-col gap-8">
            <div class="w-full">
              <img :src="servicioSeleccionado.imagen" 
                   :alt="servicioSeleccionado.titulo"
                   class="w-full h-96 object-cover rounded-lg shadow-lg">
            </div>
            <div class="w-full space-y-6">
              <div class="border-b border-gray-200 pb-4">
                <h3 class="text-3xl font-bold text-gray-900 mb-3">{{ servicioSeleccionado.titulo }}</h3>
                <div class="text-4xl font-bold text-blue-600">${{ servicioSeleccionado.precio }}</div>
              </div>
              <p class="text-lg text-gray-600 leading-relaxed">{{ servicioSeleccionado.descripcion }}</p>
              <div class="flex justify-end">
                <button @click="cerrarModal" 
                        class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ref, onMounted } from 'vue'

const servicios = ref([])

onMounted(async () => {
  console.log('MONTADO Servicios.vue')
  try {
    const { data } = await axios.get('/api/servicios')
    console.log('Respuesta servicios:', data)
    servicios.value = data
  } catch (error) {
    console.error('Error al cargar servicios:', error)
  }
})

export default {
    name: 'ServiciosPage',
    data() {
      return {
        activeCategory: 'todos',
        servicioSeleccionado: null,
        servicios: [
          // Categoría: mantenimiento
          {
            id: 1,
            categoria: 'mantenimiento',
            titulo: 'Cambio de aceite y filtro',
            descripcion: 'Incluye aceite sintético, filtro original y revisión de 10 puntos',
            imagen: '/Images/CambioAceiteyFiltro.jpg',
            precio: 1350,
            calificacion: 4
          },
          {
            id: 2,
            categoria: 'mantenimiento',
            titulo: 'Alineación y balanceo',
            descripcion: 'Incluye alineación computarizada y balanceo de las 4 ruedas',
            imagen: '/Images/AlineacionYBalanceo.jpg',
            precio: 850,
            calificacion: 4
          },
          {
            id: 3,
            categoria: 'mantenimiento',
            titulo: 'Cambio de filtro de aire',
            descripcion: 'Filtro de aire original, mejora el rendimiento de combustible',
            imagen: '/Images/LimpiezaFiltroAire.jpg',
            precio: 450,
            calificacion: 4
          },
          {
            id: 4,
            categoria: 'mantenimiento',
            titulo: 'Cambio de filtro de cabina',
            descripcion: 'Mejora la calidad del aire interior eliminando polvo, polen y particulas contaminantes',
            imagen: '/Images/CambioFiltroCabina.jpg',
            precio: 450,
            calificacion: 4
          },
          {
            id: 5,
            categoria: 'mantenimiento',
            titulo: 'Revisión y reposición de líquidos',
            descripcion: 'Verificación de niveles y rellenado de líquidos: limpiaparabrisas, refrigerante, dirección hidráulica y frenos',
            imagen: '/Images/RevisionLiquidos.jpg',
            precio: 450,
            calificacion: 4
          },
          {
            id: 6,
            categoria: 'mantenimiento',
            titulo: 'Revisión de presión de llantas y estado general',
            descripcion: 'Ajuste de presión a valores recomendados y chequeo visual de desgaste o daños en neumáticos',
            imagen: '/Images/RevisionLlantas.jpeg',
            precio: 450,
            calificacion: 4
          },
          {
            id: 7,
            categoria: 'mantenimiento',
            titulo: 'Alineación y balanceo',
            descripcion: 'Alineación de ruedas para evitar desgaste irregular y vibraciones; balanceo para mejorar estabilidad',
            imagen: '/Images/AlineacionYBalanceo.jpg',
            precio: 450,
            calificacion: 4
          },
          {
            id: 8,
            categoria: 'mantenimiento',
            titulo: 'Rotación de neumáticos',
            descripcion: 'Intercambio de posición entre llantas delanteras y traseras para prolongar su vida útil',
            imagen: '/Images/RotacionNeumaticos.jpg',
            precio: 450,
            calificacion: 4
          },
          {
            id: 9,
            categoria: 'mantenimiento',
            titulo: 'Revisión de luces',
            descripcion: 'Verificación de funcionamiento de luces delanteras, traseras, direccionales y luces interiores',
            imagen: '/Images/RevisionLuces.jpg',
            precio: 450,
            calificacion: 4
          },
          
          // Categoría: motor
          {
            id:10 ,
            categoria: 'motor',
            titulo: 'Cambio de bujías',
            descripcion: 'Mejora el rendimiento y arranque del motor con bujías originales',
            imagen: '/Images/CambioBujias.jpg',
            precio: 850,
            calificacion: 5
          },
          {
            id:11 ,
            categoria: 'motor',
            titulo: 'Cambio de correa de distribución',
            descripcion: 'Servicio preventivo clave para evitar daños graves al motor',
            imagen: '/Images/CorreaDistribucion.jpg',
            precio: 2950,
            calificacion: 5
          },
          {
            id:12 ,
            categoria: 'motor',
            titulo: 'Cambio de filtro de combustible',
            descripcion: 'Sustitución del filtro para asegurar flujo limpio de combustible hacia el motor',
            imagen: '/Images/FiltroCombustible.jpg',
            precio: 2950,
            calificacion: 5
          },
          {
            id:13 ,
            categoria: 'motor',
            titulo: 'Limpieza o reemplazo del cuerpo de aceleración',
            descripcion: 'Elimina residuos que afectan la respuesta del acelerador y el rendimiento del motor',
            imagen: '/Images/CuerpoAceleracion.jpg',
            precio: 2950,
            calificacion: 5
          },
          {
            id:14 ,
            categoria: 'motor',
            titulo: 'Revisión bomba de agua',
            descripcion: 'Verificación de fugas o fallas en el sistema de enfriameneto del motor',
            imagen: '/Images/BombaAgua.jpg',
            precio: 2950,
            calificacion: 5
          },
          {
            id:15 ,
            categoria: 'motor',
            titulo: 'Cambio de anticongelante',
            descripcion: 'Sustitución completa del liquido refrigerante para evitar sobrecalentamiento del motor',
            imagen: '/Images/Anticongelante.jpeg',
            precio: 2950,
            calificacion: 5
          },
          {
            id:16 ,
            categoria: 'motor',
            titulo: 'Limpieza de inyectores',
            descripcion: 'Servicio de limpieza profesional para mejorar la automatización del combustible y el rendimiento del motor',
            imagen: '/Images/LimpiezaInyectores.jpg',
            precio: 2950,
            calificacion: 5
          },
          {
            id:17 ,
            categoria: 'motor',
            titulo: 'Revisión del sistema de escape',
            descripcion: 'Detección de fugas, obstrucciones o daños que afecten emisiones o rendimiento',
            imagen: '/Images/SistemaEscape.jpg',
            precio: 2950,
            calificacion: 5
          },
          
          // Categoría: frenos
          {
            id:18 ,
            categoria: 'frenos',
            titulo: 'Cambio de pastillas de freno',
            descripcion: 'Pastillas de freno originales para un frenado seguro y eficiente',
            imagen: '/Images/PastillasFreno.jpg',
            precio: 1250,
            calificacion: 5
          },
          {
            id:19 ,
            categoria: 'frenos',
            titulo: 'Cambio de líquido de frenos',
            descripcion: 'Sustitución del liquido para evitar pérdida de presión y mantener el sistema en condiciones óptimas',
            imagen: '/Images/LiquidoFreno.jpeg',
            precio: 550,
            calificacion: 5
          },
          {
            id:20 ,
            categoria: 'frenos',
            titulo: 'Revisión de discos o tambores',
            descripcion: 'Inspección de desgaste o deformaciones que afecten la capacidad de frenado',
            imagen: '/Images/DiscosTambores.jpg',
            precio: 550,
            calificacion: 5
          },
          {
            id:21 ,
            categoria: 'frenos',
            titulo: 'Revisión de lineas y mangueras de freno',
            descripcion: 'Detección de fugas o deterioro que comprometan la seguridad del sistema de frenado',
            imagen: '/Images/MangueraFreno.jpg',
            precio: 550,
            calificacion: 5
          },
          
          // Categoría: suspensión
          {
            id:22 ,
            categoria: 'suspension',
            titulo: 'Cambio de amortiguadores',
            descripcion: 'Diagnóstico de fugas o pérdida de capcacidad de absorcción de impactos',
            imagen: '/Images/Amortiguadores.jpg',
            precio: 3650,
            calificacion: 5
          },
          {
            id:23 ,
            categoria: 'suspension',
            titulo: 'Revisión de rótulasa, bujes y terminales',
            descripcion: 'Inspección de componentes que afectan la estabilidad y el control del vehículo',
            imagen: '/Images/Rotulas.jpg',
            precio: 1850,
            calificacion: 4
          },
          {
            id:24 ,
            categoria: 'suspension',
            titulo: 'Alineación de dirección',
            descripcion: 'Corrección del ángulo de las ruedas para evitar desgaste irregular y mejorar el manejo',
            imagen: '/Images/AlineacionDireccion.jpeg',
            precio: 3650,
            calificacion: 5
          },
          {
            id:25 ,
            categoria: 'suspension',
            titulo: 'Revisión del sistema de dirección hidráulica',
            descripcion: 'Comprobación de fugas, ruidos o fallas en el sistema que afecen la maniobrabilidad',
            imagen: '/Images/DireccionHidraulica.png',
            precio: 3650,
            calificacion: 5
          },
          {
            id:26 ,
            categoria: 'suspension',
            titulo: 'Revisión de la barra estabilizadora',
            descripcion: 'Inspección de bujes y anclajes que ayudan a mantener la estabilidad en curvas',
            imagen: '/Images/BarraEstabilizadora.jpg',
            precio: 3650,
            calificacion: 5
          },
          {
            id:27 ,
            categoria: 'suspension',
            titulo: 'Inspección de la cremallera de dirección',
            descripcion: 'Revisión de este componente clave para la transmisión del movimiento del volante a las ruedas',
            imagen: '/Images/CremalleraDireccion.jpeg',
            precio: 3650,
            calificacion: 5
          }
        ]
      }
    },
    methods: {
      serviciosPorCategoria(categoria) {
        return this.servicios.filter(servicio => servicio.categoria === categoria);
      },
      getCategoryTitle() {
        switch(this.activeCategory) {
          case 'mantenimiento':
            return 'Mantenimiento básico';
          case 'motor':
            return 'Sistema de motor';
          case 'frenos':
            return 'Sistema de frenos';
          case 'suspension':
            return 'Suspensión y dirección';
          default:
            return 'Servicios';
        }
      },
      seleccionarServicio(servicio) {
        this.servicioSeleccionado = servicio;
      },
      cerrarModal() {
        this.servicioSeleccionado = null;
      }
    }
  }
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.modal-content-enter-active,
.modal-content-leave-active {
  transition: all 0.5s ease;
}

.modal-content-enter-from,
.modal-content-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

/* Animación para el botón de cerrar */
button {
  transition: transform 0.2s ease;
}

button:hover {
  transform: scale(1.05);
}

/* Animación para la imagen */
img {
  transition: transform 0.3s ease;
}

img:hover {
  transform: scale(1.02);
}
</style>