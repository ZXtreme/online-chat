import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'
import axios from 'axios'
import '@/assets/iconfont.js'

axios.defaults.baseURL = 'http://127.0.0.1:24000'
Vue.prototype.$http = axios

Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO('ws://127.0.0.1:24000')
}))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
