import Vue from 'vue'
import alert from './plugins/alert'

import App from './app.vue'
import '../assets/css/global.less'
// 调用 `alert.install(Vue)`
// alert.install(Vue)
Vue.use(alert, { someOption: true })
new Vue({
  render: h => h(App)
}).$mount('#root')
