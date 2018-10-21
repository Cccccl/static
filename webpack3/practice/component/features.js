/*
 * 2018.10.16.vue 高级属性 开发组件的时候会使用到
 *
 * 1.slot
 * 定义一个样式组件，样式组件内部的内容不会在组件里定义，样式组件只是定义了一个容器。
 * 组件内部的内容要放置什么东西取决于业务组件。
 *
 * 具名插槽，插槽有名字，业务组件定义了header，body 2个部分的内容。
 *
 * 2.scopedSlots 作用域插槽。想要在业务组件里使用slot的时候使用基础组件里的定义的值
 *
 * 3.ref用在vue组件上的时候打印出来的是一个vuecomponent,用在原生html标签上面打印出来的是html节点，span节点
 *
 * 4.provide
 * $parent只能找到他的父级，如果想要找到他父级的父级需要用到provide.
 * provide默认是不会提供reactive。如果需要reactive的特性，需要自己给定义的属性提供get方法。
 *
 *
 */
import Vue from 'vue'

const compB = {
  template:
  `
  <div>compB!:{{value.value}}</div>
  `,
  mounted: function () {
    console.log(this.$parent.$options.name)
    console.log(this.yeye)
    console.log(this.value)
  },
  inject: ['yeye', 'value']
}

const compA = {
  name: 'compavue',
  components: {
    compB
  },
  // template:
  // `
  // <div :style="style">
  //   <div class="header">
  //     <slot name="header"></slot>
  //   </div>
  //   <div class="body">
  //     <slot name="body"></slot>
  //   </div>
  // </div>
  // `,
  template:
  `
  <div :style="style">
    <slot :value="value" aaa="111"></slot>
    <comp-b></comp-b>
  </div>
  `,
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
  provide () {
    const data = {}

    Object.defineProperty(data, 'value', {
      get: () => this.value,
      enumerable: true
    })
    return {
      yeye: this,
      value: data
    }
  },
  name: 'root vue',
  el: '#root',
  data () {
    return {
      value: 'root value'
    }
  },
  // template:
  // `
  // <div>
  //   <comp-a>
  //     <span slot="header">this is header content</span>
  //     <span slot="body">this is body content</span>
  //   </comp-a>
  // </div>
  // `
  template:
  `
  <div>
    <comp-a ref="comp">
      <span ref="span" slot-scope="props">{{props.value}} {{props.aaa}} {{value}}</span>
    </comp-a>
    <input type="text" v-model="value">
  </div>
  `,
  mounted: function () {
    console.log(this.$refs.comp)
    console.log(this.$refs.comp.value)
    console.log(this.$refs.span)
  }
})
