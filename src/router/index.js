import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入组件
import Login from '@/views/login.vue'
import Index from '@/views/index.vue'
import Welocome from '@/views/welcome.vue'
import Articlelist from '@/views/articlelist.vue'
import Addarticle from '@/views/addarticle.vue'
Vue.use(VueRouter)

const routes = [
  {
    name: 'default',
    path: '/',
    // 用户直接输入ip进入系统时，直接重定向至index页面
    redirect: ({ path: '/index' })
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    name: 'Index',
    path: '/index',
    component: Index,
    // 一进入index页面就需要显示welcome页面的额数据，所以需要重定向
    redirect: ({ name: 'Welocome' }),
    // 嵌套路由要使用children，是一个数组，每条路由信息是一个对象
    // 其中path中的路由信息如果写/，那么在url地址栏中就不会有嵌套路由的层次，不写/才会有嵌套路由的层次
    children: [
      { name: 'Welocome',
        path: 'welocome',
        component: Welocome },
      {
        name: 'Articlelist',
        path: 'articlelist',
        component: Articlelist
      },
      {
        name: 'Addarticle',
        path: 'addarticle',
        component: Addarticle
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 添加导航守卫，没有token（即未登录的用户必须跳转到login页面进行登录后才能继续访问）
router.beforeEach((to, from, next) => {
  console.log(to)
  console.log(from)
  // 因为是后台页面，所以必须要登录之后才能访问其他的功能页面
  if (to.path !== '/login') {
    // 不是去登录页面的都需要进行token的验证
    let token = localStorage.getItem('heima_39_back_27_2')
    if (token) {
      // 如果已经登录过了，有token值就允许访问
      next()
    } else {
      // 没有token值就需要返回重新登录
      next({ path: '/login' })
    }
  } else {
    next()
  }
})

export default router
