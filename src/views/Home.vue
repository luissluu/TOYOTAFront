<template>

    <!-- Tus servicios en curso (Stepper dinámico) -->
    <div v-if="ordenes.length" class="mb-8">
        <h2 class="text-xl font-bold text-white mb-4">Tus servicios en curso</h2>
        <div v-for="orden in ordenes" :key="orden.orden_id" class="mb-8">
            <h3 class="text-base font-semibold text-blue-300 mb-4">Orden #{{ orden.orden_id }}</h3>
            <div v-for="servicio in orden.detalles" :key="servicio.detalle_id" class="mb-6">
                <div class="text-white font-medium mb-2">{{ servicio.nombre_servicio }}</div>
                <div class="flex items-center justify-start gap-4">
                    <div v-for="(step, idx) in steps" :key="step.key" class="flex items-center">
                        <div :class="[
                            'w-10 h-10 flex items-center justify-center rounded-full border-2 font-bold',
                            getStepClass(servicio.estado, step.key)
                        ]">
                            <span v-html="step.icon"></span>
                        </div>
                        <span class="ml-2 text-sm font-semibold" :class="getStepTextClass(servicio.estado, step.key)">{{ step.label }}</span>
                        <span v-if="idx < steps.length - 1" class="w-8 h-1 bg-gray-600 mx-2 rounded"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <section class="flex flex-col w-full px-6  md:justify-between md:items-center md:flex-row rounded-lg">
    <div class="max-w-5xl mx-auto w-full">
        <!-- Title for the progress bar -->
        <h2 class="text-lg font-bold text-white mb-0 text-center">Estado del Servicio</h2>
        
        <ol class="flex flex-row items-center justify-between w-full mb-3">
            <!-- Paso 1: Orden recibida (Completado) -->
            <li class="flex flex-col items-center">
                <div class="relative flex items-center justify-center">
                    <div class="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full shrink-0 z-10">
                        <svg class="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                        </svg>
                    </div>
                    <!-- Connector line to next step -->
                    <div class="absolute w-full h-0.5 bg-blue-500 right-1/2 top-6"></div>
                </div>
                <span class="mt-1 text-center text-sm font-medium text-blue-300">Orden recibida</span>
                <span class="text-xs text-blue-200">Completado</span>
            </li>
            
            <!-- Paso 2: Recibido (Activo) -->
            <li class="flex flex-col items-center">
                <div class="relative flex items-center justify-center">
                    <div class="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full shrink-0 z-10 animate-pulse">
                        <svg class="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                            <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"/>
                        </svg>
                    </div>
                    <!-- Connector line to next step -->
                    <div class="absolute w-full h-0.5 bg-gray-500 right-1/2 top-6"></div>
                </div>
                <span class="mt-1 text-center text-sm font-medium text-blue-300">Recibido</span>
                <span class="text-xs text-white">En proceso</span>
            </li>
            
            <!-- Paso 3: Mantenimiento (Pendiente) -->
            <li class="flex flex-col items-center">
                <div class="relative flex items-center justify-center">
                    <div class="flex items-center justify-center w-12 h-12 bg-gray-600 rounded-full shrink-0 z-10">
                        <svg class="w-6 h-6 text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                            <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Z"/>
                        </svg>
                    </div>
                    <!-- Connector line to next step -->
                    <div class="absolute w-full h-0.5 bg-gray-500 right-1/2 top-6"></div>
                </div>
                <span class="mt-1 text-center text-sm font-medium text-gray-300">Mantenimiento</span>
                <span class="text-xs text-gray-400">Pendiente</span>
            </li>
            
            <!-- Paso 4: Control de Calidad (Pendiente) -->
            <li class="flex flex-col items-center">
                <div class="relative flex items-center justify-center">
                    <div class="flex items-center justify-center w-12 h-12 bg-gray-600 rounded-full shrink-0 z-10">
                        <svg class="w-6 h-6 text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
                        </svg>
                    </div>
                    <!-- Connector line to next step -->
                    <div class="absolute w-full h-0.5 bg-gray-500 right-1/2 top-6"></div>
                </div>
                <span class="mt-1 text-center text-sm font-medium text-gray-300">Control de Calidad</span>
                <span class="text-xs text-gray-400">Pendiente</span>
            </li>
            
            <!-- Paso 5: Entrega (Pendiente) -->
            <li class="flex flex-col items-center">
                <div class="flex items-center justify-center w-12 h-12 bg-gray-600 rounded-full shrink-0">
                    <svg class="w-6 h-6 text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                    </svg>
                </div>
                <span class="mt-1 text-center text-sm font-medium text-gray-300">Entrega</span>
                <span class="text-xs text-gray-400">Pendiente</span>
            </li>
        </ol>
        
        <!-- Tiempo estimado de entrega -->
        <div class="flex items-center justify-center">
            <div class="bg-gray-700 rounded-lg px-4 py-2 inline-flex items-center">
                <svg class="w-5 h-5 text-blue-300 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
                    <path d="M12 7V12L15 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <div>
                    <p class="text-xs text-blue-200">Tiempo estimado de entrega</p>
                    <p class="text-base font-bold text-white">1:30 horas</p>
                </div>
            </div>
        </div>
    </div>
</section>

    <!-- Estructura de dos columnas -->
    <div class="flex flex-wrap">
        <!-- Columna izquierda/central (75% en desktop) -->
    <div class="w-full lg:w-3/4 pr-0 lg:pr-4">
<section class="grid grid-cols-1 gap-8 px-8 md:grid-cols-2">
    <div class="bg-gray-800 md:col-span-2">
        <div class="mx-auto max-w-2xl px-4 py-1 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-8">
            <h2 class="text-2xl font-bold tracking-tight text-white">Servicios recomendados</h2>

            <div class="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            <!-- Tarjeta 1: Cambio de aceite y filtro -->
            <div class="w-full bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col">
                <a href="#" class="flex-shrink-0">
                    <div class="w-full h-48 overflow-hidden rounded-t-lg">
                        <img class="w-full h-full object-cover" src="/Images/CambioAceiteyFiltro.jpg" alt="Cambio de aceite y filtro" />
                    </div>
                </a>
                <div class="px-5 py-4 flex-grow flex flex-col">
                    <a href="#" class="mb-auto">
                        <h5 class="text-xl font-semibold tracking-tight text-gray-900 h-14">Cambio de aceite y filtro</h5>
                    </a>
                    <div class="flex items-center mt-2 mb-4">
                        <div class="flex items-center space-x-1 rtl:space-x-reverse">
                            <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <!-- Repetir para otras estrellas -->
                            <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <svg class="w-4 h-4 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                        </div>
                        <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm ms-3">4.0</span>
                    </div>
                    <div class="flex items-center justify-between mt-auto">
                        <span class="text-3xl font-bold text-gray-900">$750</span>
                        <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Agregar</a>
                    </div>
                </div>
            </div>
            
            <!-- Tarjeta 2: Alineación y balanceo -->
            <div class="w-full bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col">
                <a href="#" class="flex-shrink-0">
                    <div class="w-full h-48 overflow-hidden rounded-t-lg">
                        <img class="w-full h-full object-cover" src="/Images/AlineacionYBalanceo.jpg" alt="Alineación y balanceo" />
                    </div>
                </a>
                <div class="px-5 py-4 flex-grow flex flex-col">
                    <a href="#" class="mb-auto">
                        <h5 class="text-xl font-semibold tracking-tight text-gray-900 h-14">Alineación y balanceo</h5>
                    </a>
                    <div class="flex items-center mt-2 mb-4">
                        <div class="flex items-center space-x-1 rtl:space-x-reverse">
                            <!-- Las estrellas -->
                            <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <!-- Repetir para otras estrellas -->
                            <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <svg class="w-4 h-4 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                        </div>
                        <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm ms-3">4.0</span>
                    </div>
                    <div class="flex items-center justify-between mt-auto">
                        <span class="text-3xl font-bold text-gray-900">$850</span>
                        <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Agregar</a>
                    </div>
                </div>
            </div>

            <!-- Tarjeta 3: Cambio de bujías -->
            <div class="w-full bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col">
                <a href="#" class="flex-shrink-0">
                    <div class="w-full h-48 overflow-hidden rounded-t-lg">
                        <img class="w-full h-full object-cover" src="/Images/CambioBujias.jpg" alt="Cambio de bujías" />
                    </div>
                </a>
                <div class="px-5 py-4 flex-grow flex flex-col">
                    <a href="#" class="mb-auto">
                        <h5 class="text-xl font-semibold tracking-tight text-gray-900 h-14">Cambio de bujías</h5>
                    </a>
                    <div class="flex items-center mt-2 mb-4">
                        <div class="flex items-center space-x-1 rtl:space-x-reverse">
                            <!-- Las estrellas -->
                            <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <!-- Repetir para otras estrellas -->
                            <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                        </div>
                        <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm ms-3">5.0</span>
                    </div>
                    <div class="flex items-center justify-between mt-auto">
                        <span class="text-3xl font-bold text-gray-900">$850</span>
                        <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Agregar</a>
                    </div>
                </div>
            </div>

            <div class="w-full bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col">
                <a href="#" class="flex-shrink-0">
                    <div class="w-full h-48 overflow-hidden rounded-t-lg">
                        <img class="w-full h-full object-cover" src="/Images/LimpiezaFiltroAire.jpg" alt="Cambio de bujías" />
                    </div>
                </a>
                <div class="px-5 py-4 flex-grow flex flex-col">
                    <a href="#" class="mb-auto">
                        <h5 class="text-xl font-semibold tracking-tight text-gray-900 h-14">Limpieza filtro de aire</h5>
                    </a>
                    <div class="flex items-center mt-2 mb-4">
                        <div class="flex items-center space-x-1 rtl:space-x-reverse">
                            <!-- Las estrellas -->
                            <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <!-- Repetir para otras estrellas -->
                            <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <svg class="w-4 h-4 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                        </div>
                        <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm ms-3">4.0</span>
                    </div>
                    <div class="flex items-center justify-between mt-auto">
                        <span class="text-3xl font-bold text-gray-900">$850</span>
                        <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Agregar</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
            </section>
        </div>
        
        <!-- Columna derecha (25% en desktop) para las tarjetas personalizadas -->
        <div class="w-full lg:w-1/4 mt-8 lg:mt-0 sticky top-32">
            <div class="flex flex-col space-y-4 px-4">
                <!-- Tarjeta de Servicios acumulados (abajo) -->
                <div class="flex items-center px-6 py-8 bg-gray-500 rounded-lg shadow-md shadow-black">
                    <div class="flex items-center -mx-2">
                        <svg class="mx-2" width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="35" cy="35" r="35" fill="#222222" fill-opacity="0.8" />
                            <path d="M46.75 26.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z M29.867 39.125h.008v.008h-.008v-.008Z" stroke="#b60c0c" stroke-width="2" stroke-linecap="square" />
                        </svg>

                        <div class="mx-2">
                            <h3 class="text-2xl font-medium text-white">7</h3>
                            <p class="mt-1 text-sm text-white">Servicios acumulados</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Botón destacado para agendar cita -->
    <div class="flex justify-end mb-8">
      <div class="bg-gradient-to-r from-indigo-700 via-blue-700 to-indigo-900 border-2 border-indigo-500 rounded-xl shadow-lg p-4 flex items-center space-x-4 hover:shadow-2xl transition">
        <svg class="w-10 h-10 text-white drop-shadow-lg" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="4" stroke="currentColor" stroke-width="2.5" fill="#6366f1"/>
          <path stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" d="M8 2v4M16 2v4M3 10h18M12 14v4M10 16h4"/>
        </svg>
        <div class="flex flex-col">
          <span class="text-lg font-bold text-white">¿Necesitas un servicio?</span>
          <span class="text-sm text-blue-200">Agenda tu cita fácilmente en línea</span>
        </div>
        <router-link
          to="/agendar-cita"
          class="ml-6 px-6 py-2 bg-white text-indigo-700 font-bold rounded-lg shadow hover:bg-indigo-600 hover:text-white transition text-lg border-2 border-indigo-400"
        >
          <span class="inline-flex items-center">
            <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10m-9 4h6m-7 5h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z"/>
            </svg>
            Agendar Cita
          </span>
        </router-link>
      </div>
    </div>

</template>

<script>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/components/stores/auth'

const steps = [
  { key: 'recibido', label: 'Recibido', icon: '✔️' },
  { key: 'mantenimiento', label: 'Mantenimiento', icon: '🛠️' },
  { key: 'calidad', label: 'Control de Calidad', icon: '🔍' },
  { key: 'entrega', label: 'Entrega', icon: '🚗' }
]

function getStepClass(estado, stepKey) {
  // Puedes personalizar la lógica según tus estados reales
  if (estado === 'completado' && stepKey === 'entrega') return 'bg-green-500 border-green-500 text-white';
  if (estado === 'en progreso' && stepKey === 'mantenimiento') return 'bg-yellow-400 border-yellow-400 text-white';
  if (estado === 'pendiente' && stepKey === 'recibido') return 'bg-gray-400 border-gray-400 text-white';
  return 'bg-gray-800 border-gray-600 text-gray-400';
}
function getStepTextClass(estado, stepKey) {
  if (estado === 'completado' && stepKey === 'entrega') return 'text-green-400';
  if (estado === 'en progreso' && stepKey === 'mantenimiento') return 'text-yellow-400';
  if (estado === 'pendiente' && stepKey === 'recibido') return 'text-gray-400';
  return 'text-gray-300';
}

export default {
  name: 'HomePage',
  setup() {
    const authStore = useAuthStore()
    const ordenes = ref([])

    const cargarOrdenes = async () => {
      try {
        // Esperar a que el usuario esté disponible
        await authStore.restoreSession?.()
        const usuarioId = authStore.user?.id
        console.log('usuarioId usado para cargar órdenes:', usuarioId)
        if (!usuarioId) return
        const { data } = await axios.get(`/api/ordenes-servicio/usuario/${usuarioId}`)
        console.log('Órdenes del usuario:', data)
        ordenes.value = data
      } catch (error) {
        console.error('Error al cargar órdenes del usuario:', error)
      }
    }

    onMounted(() => {
      cargarOrdenes()
    })

    return { ordenes, steps, getStepClass, getStepTextClass }
  }
}
</script>