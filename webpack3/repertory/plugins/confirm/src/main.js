import Vue from 'vue'
import Main from './main.vue'
let ConfirmConstructor = Vue.extend(Main)

let instance
let instances = []
let seed = 1

let Confirm = (options = {}) => {
  if (Vue.prototype.$isServer) return
  let id = 'confirm_' + seed++
  return new Promise((resolve, reject) => {
    const { ...rest } = options
    instance = new ConfirmConstructor({
      data: {
        ...rest
      },
      methods: {
        success () {
          instance.hide()
          resolve('success')
        },
        cancel () {
          instance.hide()
          resolve('cancel')
        }
      }
    })
    instance.id = id
    // 生成dom节点,添加到body
    instance.vm = instance.$mount()
    document.body.appendChild(instance.vm.$el)
    instance.vm.visible = true
    instances.push(instance)

    instance.$on('closed', () => {
      document.body.removeChild(instance.vm.$el)
      instance.vm.$destroy()
    })
  })
}

export default Confirm
