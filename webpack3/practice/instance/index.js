/*
 * 2018.8.31.vue实例
 * 1. vue实例的创建和作用
 * 2. vue实例的属性
 * 3. vue实例的方法
 *
 * el 挂载, 或者通过$mount挂载实例
 * template 会被编译成render function
 *
 * 1. $mount
 * 如果vue实例在实例化时没有收到el选项，则它处于“未挂载”状态，没有关联的dom元素
 * 可以使用vm.$mount()手动地挂载一个未挂载的实例。
 * 如果没有提供elementOrSelector参数，模板将被渲染为文档之外的元素，并且你必须使用原生dom api 把它插入文档中。
 * 这个方法还返回实例本身。
 *
 * 2. el,$el
 * el，只在由new 创建的实例中遵守
 * 提供一个在页面上已经存在的dom元素作为vue实例的挂载目标
 * 在实例挂载之后，Vue 实例使用的根 DOM 元素。可以用vm.$el访问。
 * 如果在实例时存在这个选项，实例立即进入编译过程，否则，需要显示调用vm.$mount()手动开启编译。
 */
import Vue from 'vue'

const app = new Vue({
  data: {
    number: 0,
    number2: 0,
    obj: {
      name: 'ccc1l'
    }
  },
  template: `<div ref="cc1l">
            name: {{obj.name}}
            number: {{number}}
            number2: {{number2}}
            </div>
            `
})
app.$mount('#root')

// 属性
console.log(app)
console.log(app.$root) // vue的实例 instance 根节点 app.$root === app
console.log(app.$mount())
console.log(app.$mount() === app.$root)
console.log(app.$mount() === app)
console.log(app.$data)
console.log(app.$props)
console.log(app.$el)
// new 实例的时候，默认的参数值，以及我们传递进去的参数值
// 直接修改$options上面的参数值是没有作用的。
// 给$options.render赋值，需要在下一次有变化的时候，才会渲染。
console.log(app.$options)
// app.$options.render = (h) => {
//   return h('div', {}, 'new render function')
// }

// 组件相关
console.log(app.$children)
console.log(app.$slots)
console.log(app.$scopedSlots)
// refs 如果是html节点，就会返回html相关的节点；如果是组件，就会返回组件的实例（vue的实例）
console.log(app.$refs)
// 服务端渲染的时候做判断
console.log(app.$isServer)

// 方法
// 如果把watch 写在data里，在实例销毁的时候，watch会被自动注销掉，就不会导致内存溢出的情况，
// 如果是调用$watch的方法，那么需要手动调用注销的方法。

const unWatch = app.$watch('number', (newNumber, oldNumber) => {
  console.log(`${oldNumber}: ${newNumber}`)
})
setTimeout(() => {
  // 之后取消观察
  unWatch()
}, 4000)
// let i = 0
// setInterval(() => {
//   app.number += 1
//   app.number += 1
//   i++
//   app.number2 = i
//   app.$set(app.obj, 'name', i)
// }, 1000)
// app.$forceUpdate()

// $on，$emit 必须作用在同一个对象上
// $once 只触发一次
app.$on('test', (a, b) => {
  console.log(`text emmied: ${a}:${b}`)
})

// app.$emit('test', 1, 2)
setInterval(() => {
  app.$emit('test', 1, 2)
}, 1000)

// app.$forceUpdate(), 迫使 Vue 实例重新渲染。
// 注意它仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件。$forceUpdate 和 $options
// app.$nextTick,更新了值，但是dom节点没有变化
