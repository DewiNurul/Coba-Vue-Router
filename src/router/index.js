import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Petugas from '../views/Petugas.vue'
import DataSiswa from '../views/DataSiswa.vue'
import DataPelanggaran from '../views/DataPelanggaran.vue'
import InputPelanggaran from '../views/InputPelanggaran.vue'
import PoinSiswa from '../views/PoinSiswa.vue'
import Login from '../views/Login.vue'
import Navbar from '../views/layouts/Navbar.vue'
import Footer from '../views/layouts/Footer.vue'
import Sidebar from '../views/layouts/Sidebar.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    components: {default: Login, footer: Footer}
  },
  {
    path: '/',
    name: 'home',
    components: {default: Home, header: Navbar, sidebar: Sidebar, footer: Footer},
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/petugas',
    name: 'petugas',
    components: {default: Petugas, header: Navbar, footer: Footer},
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/data_siswa',
    name: 'data_siswa',
    components: {default: DataSiswa, header: Navbar, footer: Footer}, 
    meta: {
      requiresAuth: true
  // default DataSiswa itu dari DataSiswa.vue
  // NAME DAN PATH : mengacu pada data_siswa di DataSiswa.vue
    }
  },
  {
    path: '/data_pelanggaran',
    name: 'data_pelanggaran',
    components: {default: DataPelanggaran, header: Navbar, footer: Footer},
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/input_pelanggaran',
    name: 'input_pelanggaran',
    components: {default: InputPelanggaran, header: Navbar, footer: Footer},
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/poin_siswa',
    name: 'poin_siswa',
    components: {default: PoinSiswa, header: Navbar, footer: Footer},
    meta: { 
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
})

export default router
