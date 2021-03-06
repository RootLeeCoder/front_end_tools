import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
    // 跳转到主页(目前是直接跳转到Base64)
    { path: '/', redirect: '/tools/Base64_Image'},
    { path: '*', redirect: '/tools/Base64_Image'},
    // Base64和图片转换
    {
      path: '/tools',
      name: 'Layout',
      component: function () {
        return import('../views/Layout/Layout.vue')
      },
      children: [
        // Base64和图片转换
        {
          path: '/tools/Base64_Image',
          name: 'Base64_Image',
          component: function () {
            return import('../views/Base64_Image/Base64_Image.vue')
          },
          meta: {
            title: 'Base64和图片转换——前端工具合集'
          }
        },
        // Base64转码
        {
          path: '/tools/Base64',
          name: 'Base64',
          component: function () {
            return import('../views/Base64/Base64.vue')
          },
          meta: {
            title: 'Base64转码——前端工具合集'
          }
        },
        // RGB和十六进制转换
        {
          path: '/tools/Color',
          name: 'Color',
          component: function () {
            return import('../views/Color/Color.vue')
          },
          meta: {
            title: 'RGB和十六进制转换——前端工具合集'
          }
        },
        // MD5加密
        {
          path: '/tools/MD5',
          name: 'MD5',
          component: function () {
            return import('../views/MD5/MD5.vue')
          },
          meta: {
            title: 'MD5加密——前端工具合集'
          }
        },
        // 时间戳转换
        {
          path: '/tools/TimeStamp',
          name: 'TimeStamp',
          component: function () {
            return import('../views/TimeStamp/TimeStamp.vue')
          },
          meta: {
            title: '时间戳转换——前端工具合集'
          }
        },
        // 哔哩哔哩av和BV号互转
        {
          path: '/tools/Bilibili',
          name: 'Bilibili',
          component: function () {
            return import('../views/Bilibili/Bilibili.vue')
          },
          meta: {
            title: '哔哩哔哩av和BV号互转——前端工具合集'
          }
        },
        // 长者曰(功能已完成，暂不开放，想玩的自己解除下方封印)
        // {
        //   path: '/tools/ElderSay',
        //   name: 'ElderSay',
        //   component: function () {
        //     return import('../views/ElderSay/ElderSay.vue')
        //   },
        //   meta: {
        //     title: '长者曰——前端工具合集'
        //   }
        // },
      ]
    },
  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
