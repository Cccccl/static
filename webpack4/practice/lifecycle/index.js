/*
 * 2018.8.31 生命周期（生命周期方法）
 * 1. 有哪些生命周期方法
 * 2. 生命周期方法的调用顺序
 * 3. 生命周期中的VUE实例有哪些区别
 *
 * mount就是把实例挂在到el，html节点上。
 * create 是初始化
 * beforecreate create beforeMount mounted 都只会执行一次
 * 在服务端beforemount mounted都不会执行，在服务端不存在dom的环境
 */

import Vue from 'vue'

const app = new Vue({
  template: '<div>{{text}}</div>',
  data: {
    text: 0
  },
  // 在beforecreate和create生命周期想要操作dom是不可能的，在这2个生命周期里，想要的dom节点都还没有生成
  beforeCreate () {
    // 不要修改data里面的数据，ajax修改的数据最早也需要在create里面操作
    console.log(this.$el, 'beforeCreate')
  },
  created () {
    console.log(this.$el, 'created')
  },
  // dom相关的需要在mounted里面
  beforeMount () {
    console.log(this.$el, 'beforeMount')
  },
  mounted () {
    console.log(this.$el, 'mounted')
  },
  beforeUpdate () {
    console.log(this, 'beforeUpdate')
  },
  updated () {
    console.log(this, 'updated')
  },
  // keep-alive相关，在组件章节讲解
  activated () {
    console.log(this, 'activated')
  },
  deactivated () {
    console.log(this, 'deactivated')
  },
  beforeDestroy () {
    console.log(this, 'beforeDestroy')
  },
  destroyed () {
    console.log(this, 'destroyed')
  }
  // render (h) {
  //   // throw new TypeError('render error~~~~~~~~~~~~~')
  //   // beforeMount的时候还是我们在template里面写的节点，然后执行render函数，渲染，得到在mount里面的被渲染之后的html节点
  //   // 我们写的.vue文件会被vue-laoder 把里面的template解析为render函数。template解析为vue-loader是一个耗时的过程
  //   console.log('render function invoked')
  //   // return h('div', {}, this.text)
  //   return h('div', {}, 'cc1l')
  // },
  // renderError (h, err) {
  //   // 本组件的render方法报错的时候，renderError才会被触发，子组件的报错并不会
  //   return h('div', {}, err.stack)
  // }
  // errorCaptured (h, err) {
  //   // 可以用在生产环境，可以使用
  //   // 会向上冒泡，子组件的报错也会被捕捉
  //   return h('div', {}, err.stack)
  // }
})

console.log(app)
app.$mount('#root')
setInterval(() => {
  app.text = app.text += 1
}, 1000)

setTimeout(() => {
  app.$destroy()
}, 4000)
// $destroy,完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令及事件监听器。
// 触发 beforeDestroy 和 destroyed 的钩子。
