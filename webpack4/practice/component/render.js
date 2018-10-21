/*
 * 2018.10.16.vue render function vue的渲染过程
 *
 * template只是一个字符串，最终会经过生命周期里的一个过程（编译），编译成一个js的函数render function。 这个过程是通过vue loader处理的。
 * 在render function 里面默认会传进来一个创建节点的函数createElement。$createElement是vue提供的一个创建节点的函数，在每一个vue的实例上面都存在
 *
 * render 函数里，写入slot插槽的时候，slot是内置组件，可以通过$slot引入，$slot.defalut是指没有命名的时候。
 * createElement 创建的节点并不是 实际的dom节点而是一个vnode的类，在内存里。虚拟dom 高性能的根本原理
 * 虚拟dom vnode会跟真正的dom节点进行比较，如果需要更新，才把它转化为真正的dom节点。
 *
 * render函数里，如果on是在vuecomponent上的话需要$emit去触发事件，如果on是在html节点上的就是原生的事件。
 * nativeOn会把事件绑定到根节点上面。
 *
 * 一共三种方式 jsx, render function, template
 */
import Vue from 'vue'

const compA = {
  props: ['props1'],
  name: 'compavue',
  // template:
  // `
  // <div :style="style">
  //   <slot></slot>
  //   {{props1}}
  // </div>
  // `,
  render: function () {
    return this.$createElement('div', {
      style: this.style
      // on: {
      //   click: () => { this.$emit('click') }
      // }
    }, [
      this.$slots.header,
      this.props1
    ])
  },
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      },
      value: 'compA value'
    }
  }
}

new Vue({
  components: {
    compA
  },
  name: 'root vue',
  el: '#root',
  data () {
    return {
      value: 'testvalue'
    }
  },
  mounted: function () {
    console.log(this.$refs.comp)
    console.log(this.$refs.comp.value)
    console.log(this.$refs.span)
  },
  methods: {
    handleClick () {
      console.log('clicked!')
    }
  },
  // template:
  // `
  // <div>
  //   <comp-a ref="comp">
  //     <span ref="span">{{value}}</span>
  //   </comp-a>
  // </div>
  // `,
  render () {
    return this.$createElement('comp-a', {
      ref: 'comp',
      props: {
        props1: this.value
      },
      // on: {
      //   click: this.handleClick
      // }
      nativeOn: {
        click: this.handleClick
      }
    }, [
      this.$createElement('span', {
        ref: 'span',
        slot: 'header',
        domProps: {
          innerHTML: '<span>123</span>'
        },
        attrs: {
          id: 'test-id'
        }
      }, this.value)
    ])
  }
})
