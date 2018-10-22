import Vue from 'vue'
import App from './app.vue'
import alert from './plugins/alert'
import confirm from './plugins/confirm'

import '../assets/css/global.less'
// 调用 `alert.install(Vue)`
// alert.install(Vue)
Vue.use(alert)
Vue.use(confirm)

new Vue({
  render: h => h(App)
}).$mount('#root')
