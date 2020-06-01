import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Base64',
    component: function () {
      return import('../views/Base64/Base64.vue')
    }
  },
  {
    path: '/Base64',
    name: 'Base64',
    component: function () {
      return import('../views/Base64/Base64.vue')
    }
  },
  {
    path: '/Color',
    name: 'Color',
    component: function () {
      return import('../views/Color/Color.vue')
    }
  },
  {
    path: '/MD5',
    name: 'MD5',
    component: function () {
      return import('../views/MD5/MD5.vue')
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
