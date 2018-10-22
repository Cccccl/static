import Confirm from './src/main.js'

Confirm.install = (Vue, options) => {
  Vue.prototype.$confirm = Confirm
}
export default Confirm
