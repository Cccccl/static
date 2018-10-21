import Vue from 'vue'
import Main from './main.vue'
let AlertConstructor = Vue.extend(Main)

let instance
let instances = []
let seed = 1

let Alert = (options = {}) => {
  return new Promise((resolve, reject) => {
    // extend 是构造一个组件的语法器.传入参数，返回一个组件
    const { ...rest } = options
    let id = 'alert_' + seed++
    // 实例化ConfirmConstructor组件
    instance = new AlertConstructor({
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
    // 生成dom节点,添加到boby
    instance.vm = instance.$mount()
    document.body.appendChild(instance.vm.$el)
    instance.vm.visible = true
    instances.push(instance)
  })
}
export default Alert
