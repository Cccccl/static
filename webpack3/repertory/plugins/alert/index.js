import Alert from './src/main.js'

Alert.install = (Vue, options) => {
  // 1. 添加全局方法或属性
  Vue.myGlobalMethod = Alert
  // 4. 添加实例方法
  Vue.prototype.$alert = Alert
  // Vue.component(Alert.name, Alert)
}
export default Alert
