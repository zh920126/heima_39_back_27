import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入样式文件
import '@/styles/index.css'
// 全局引入element-ui框架
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
