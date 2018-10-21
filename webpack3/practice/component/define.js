/*
 * 2018.9.6.vue define
 * 定义组件，.vue 文件开发的时候，export出去一个对象
 *
 * 声明一个对象，可以通过2种方式来变成一个vue的组件，一个全局注册组件，一个局部注册组件。
 * 1.在全局使用component方法，把component对象定义到全局来使用,定义组件命名的时候采用驼峰命名的方式
 * Vue.component('comp', component)
 * 2.只在某一个地方使用,在new Vue的通过中输入一个配置项components
 * 注册之后就是一个vue的实例了，和new Vue出来的结果是一样的。
 *
 * 在定义一个组件的时候，如果这个组件不是通过new Vue来定义的，
 * 而是需要通过全局注册，或者局部注册到vue的实例里的时候，
 * 那么这个data 需要是一个 function, 要return 那个数据结构。
 * 多次使用这个组件的时候，希望里面的数据都是各自一份，相互之间没有影响的。
 * 在不使用return一个functin的时候，会出现 2个被使用的组件之间共用一份数据。
 *
 * 可以通过props来配置组件的一些行为。
 * 在组件里不应该修改props
 * 在组件内部主动地去修改props是不正确的，如果希望主动修改一个值，那么这个值应该定义在data里面
 * props是外部组件（父组件）约束 内部组件的展示行为的，作为一个子节点不应该去修改父节点给我们的定义，
 * 如果子组件要修改父组件的内容,那么说明，这个子组件的定义没有做好。
 * 要过要修改props值的内容，那么应该通过事件告诉外部组件（父组件），我们希望改变props值的内容，希望你可以改变传过来的值的内容。
 * 然后外部组件会根据需求，修改这个值，控制权在父组件。
 * $emit v-on
 * props数据验证
 *
 * 模板里采用 - 隔开。  变量里采用camlecase的方式命名变量
 */

import Vue from 'vue'

const componentAconfig = {
  name: 'coma',
  template:
  `
  <div>
    全局注册组件
  </div>
  `
}

const componentBconfig = {
  name: 'comb',
  template:
  `
  <div>
    <input type="text" v-model="text">局部注册组件{{text}}
    <span @click="handleChange">{{propOne}}</span>
    <div>
      <span v-if="active">see me IF active != 0</span>
      <span v-else>see me IF active = 0 </span>
    </div>
  </div>
  `,
  data () {
    return {
      text: 0
    }
  },
  props: {
    active: {
      type: Number,
      required: true,
      // default: true,
      validator (value) {
        return typeof value === 'number'
      }
    },
    propOne: String
  },
  methods: {
    handleChange () {
      this.$emit('changeB')
    }
  }
}

Vue.component('comA', componentAconfig)

new Vue({
  el: '#root',
  components: {
    'comB': componentBconfig
  },
  data: {
    prop1: 'text1'
  },
  methods: {
    handleChange () {
      this.prop1 += '~'
    }
  },
  mounted: function () {
    console.log(this.$refs.comA)
    console.log(this.$refs.comB)
  },
  template:
  `
  <div>
    <com-a ref="comA"></com-a>
    <com-b ref="comB" :active='-1' :prop-one="prop1" @changeB="handleChange"></com-b>
  </div>
  `
})
