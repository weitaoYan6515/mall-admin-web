import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import VCharts from 'v-charts'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

Vue.use(ElementUI, { locale })

Vue._watchers=Vue.prototype._watchers=[]
Vue.use(VCharts)

Vue.config.productionTip = false

import "@/api" //global api


import global from "@/utils/global"
Vue.prototype.$global=global
Vue.prototype.$eventBus=new Vue()

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
