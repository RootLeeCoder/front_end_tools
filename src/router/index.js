import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  // 首页（目前是直接跳转到Base64）
  {
    path: '/',
    name: 'HomePage',
    component: function () {
      return import('../views/HomePage/HomePage.vue')
    }
  },
  // Base64转码
  {
    path: '/Base64',
    name: 'Base64',
    component: function () {
      return import('../views/Base64/Base64.vue')
    }
  },
  // RGB和十六进制转换
  {
    path: '/Color',
    name: 'Color',
    component: function () {
      return import('../views/Color/Color.vue')
    }
  },
  // MD5转码
  {
    path: '/MD5',
    name: 'MD5',
    component: function () {
      return import('../views/MD5/MD5.vue')
    }
  },
  // 时间戳转换
  {
    path: '/TimeStamp',
    name: 'TimeStamp',
    component: function () {
      return import('../views/TimeStamp/TimeStamp.vue')
    }
  },
  // 哔哩哔哩av和BV号互转
  {
    path: '/Bilibili',
    name: 'Bilibili',
    component: function () {
      return import('../views/Bilibili/Bilibili.vue')
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
