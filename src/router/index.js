import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入组件
import Login from '@/views/login.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
