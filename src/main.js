import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en'
import i18n from './lang' // Internationalization
import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
/*self*/
// import VueBus from 'vue-bus';
// Vue.use(VueBus);

import '@/icons' // icon
import '@/permission' // permission control
/*=====*/
// import '@/styles/icon/demo.css'
import '@/styles/icon/iconfont.css'
// import '@/styles/icon/iconfont.js'
// import '@/styles/icon/iconfont.eot'
// import '@/styles/icon/iconfont.ttf'
// import '@/styles/icon/iconfont.woff'

import axios from 'axios'
import SIdentify from './views/login/Identify'
Vue.prototype.$http = axios

Vue.use(ElementUI);
// Vue.use(Element, {
//   size: 'medium', // set element-ui default size
//   i18n: (key, value) => i18n.t(key, value)
// })
Vue.component('SIdentify', SIdentify)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App },
  data:{
    Bus: new Vue()
  }
})
