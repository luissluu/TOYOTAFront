import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import Registro from '../views/auth/Registro.vue'
import RecuperacionContrasena from '../views/auth/RecuperacionContrasena.vue'
import RestablecerContraseña from '../views/auth/RestablecerContraseña.vue'
import Configuracion from '../views/Configuracion.vue'
import Perfil from '../views/Perfil.vue'
import Servicios from '../views/Servicios.vue'
import Historial from '../views/Historial.vue'

// Layouts
import AdminLayout from '../Layouts/AdminLayout.vue'

// Admin views
import AdminHome from '../views/admin/AdminHome.vue'
import AdminPerfil from '../views/admin/AdminPerfil.vue'
import AdminCambiarContrasena from '../views/admin/AdminCambiarContrasena.vue'

// Importamos la tienda de autenticación
import { useAuthStore } from '../components/stores/auth'

// Ruta protegida que verifica la autenticación
const requireAuth = (to, from, next) => {
  const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
  if (!token) {
    return next('/login');
  }
  next();
};

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  
  // Rutas de autenticación
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { layout: 'auth' }
  },
  {
    path: '/registro',
    name: 'Registro',
    component: Registro,
    meta: { layout: 'auth' }
  },
  {
    path: '/recuperar-contrasena',
    name: 'RecuperarContrasena',
    component: RecuperacionContrasena,
    meta: { layout: 'auth' }
  },
  
  {
    path: '/reset-password/:token',
    name: 'ResetPassword',
    component: RestablecerContraseña,
    meta: { layout: 'auth' }
  },

  // Rutas principales para usuarios normales (protegidas)
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
    beforeEnter: requireAuth
  },
  {
    path: '/Servicios',
    name: 'Servicios',
    component: Servicios,
    meta: { requiresAuth: true },
    beforeEnter: requireAuth
  },
  {
    path: '/Historial',
    name: 'Historial',
    component: Historial,
    meta: { requiresAuth: true },
    beforeEnter: requireAuth
  },
  {
    path: '/configuracion',
    name: 'Configuracion',
    component: Configuracion,
    meta: { requiresAuth: true },
    beforeEnter: requireAuth
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: Perfil,
    meta: { requiresAuth: true },
    beforeEnter: requireAuth
  },

  // Rutas de administrador (protegidas)
  {
    path: '/admin',
    component: AdminLayout,
    beforeEnter: requireAuth,
    children: [
      {
        path: '',
        name: 'AdminHome',
        component: AdminHome
      },
      {
        path: 'perfil',
        name: 'AdminPerfil',
        component: AdminPerfil
      },
      {
        path: 'cambiar-contrasena',
        name: 'AdminCambiarContrasena',
        component: AdminCambiarContrasena
      },
      {
        path: 'usuarios',
        name: 'AdminUsuarios',
        component: () => import('../views/admin/AdminUsuarios.vue')
      },
      {
        path: 'servicios',
        name: 'AdminHistorialServ',
        component: () => import('../views/admin/AdminHistorialServ.vue')
      },
      {
        path: 'reportes',
        name: 'AdminInventario',
        component: () => import('../views/admin/AdminInventario.vue')
      },
      {
        path: 'configuracion',
        name: 'AdminConfiguracion',
        component: () => import('../views/admin/AdminConfiguracion.vue')
      }
    ]
  },
  
  // Ruta para manejar páginas no encontradas
  {
    path: '/:pathMatch(.*)*',
    redirect: '/Home'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Guardia de navegación global
router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
  
  // Si la ruta requiere autenticación y no hay token, redirige a login
  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    return next('/login');
  }
  
  // Si intenta acceder a rutas de autenticación y ya está autenticado, redirige a home
  if ((to.path === '/login' || to.path === '/registro' || to.path === '/recuperar-contrasena') && token) {
    return next('/Home');
  }
  
  // En otros casos, permite la navegación
  next();
});

export default router;