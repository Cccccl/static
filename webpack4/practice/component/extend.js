/*
 * 2018.9.6.vue extend
 *
 * 组件的$parent就是调用这个组件的实例。（引用他的）
 * 在子组件的内部可以通过$parent，直接调用到父组件的内部。
 * 可以通过parent 改父组件的值，但是不建议使用。最好用作查看。
 *
 * 通过new一个Vue的实例的时候，我们可以指定parent是什么
 * 如果我们是通过声明一个组件，然后这个组件是通过模板的形式去编译，这种情况下，
 * 我们得到的parent就是vue 在渲染的过程中去指定的,是没有办法修改的，就算在这个组件里添加parent，也不起作用。
 *
 * 1.通过vue的extend来扩展vue
 * ConstructorA是vue这个类的之类，预先设定好了componenta上的属性。
 * 2.baseB继承baseA
 * 已经开发了一个组件a，组件a是一个泛的组件，很多网站可以使用，有很多的配置项，
 * 但是某一个具体的业务只需要这个组件的部分功能，并且需要拓展组件的时候
 * 可以通过extends组件a，然后覆盖组件a的部分内容，然后获得新的组件b。
 *
 * propsData只用于 new 创建的实例中。创建实例时传递 props。主要作用是方便测试。
 * 实例里定义的data会覆盖组件里定义的data
 * baseB继承baseA的时候data,methods 都被会覆盖, mounted会先执行baseA的mounted然后执行baseB的mounted
 */
import Vue from 'vue'

const parent = new Vue({
  name: 'parent vue'
})

const baseA = {
  parent: parent,
  props: {
    active: Boolean,
    propOne: String
  },
  template:
  `
  <div>
    <input type="text" v-model="number">{{text}} {{number}}</input>
    <div>
      <span @click="handleChange">{{propOne}}</span>
      <span v-show="active">see me if active is true</span>
    </div>
    <div @click="testMethods">测试方法</div>
  </div>
  `,
  data () {
    return {
      number: 0,
      text: '基础组件a'
    }
  },
  mounted () {
    console.log('baseA comp mounted')
    console.log(this.$parent.$options.name)
  },
  methods: {
    handleChange () {
      this.$emit('change')
    },
    testMethods () {
      console.log('baseA methods')
    }
  }
}

const baseB = {
  parent: parent,
  extends: baseA,
  data () {
    return {
      number: 1,
      text: '基础组件b'
    }
  },
  mounted () {
    console.log('baseB comp mounted')
    console.log(this.$parent.$options.name)
    this.$parent.handleChange()
    this.$parent.text = 'baseB修改vue实例里的text 子组件把父组件data的值修改了'
  },
  methods: {
    testMethods () {
      console.log('baseB methods')
    }
  }
}
console.log(baseB)

// const ConstructorA = Vue.extend(baseA)

// new ConstructorA({
//   el: '#root',
//   name: 'instance vue',
//   propsData: {
//     propOne: 'xxx'
//   },
//   data: {
//     text: '实例a'
//   },
//   mounted () {
//     console.log('instance mounted')
//   }
// })

new Vue({
  parent: parent,
  name: 'root vue',
  el: '#root',
  mounted () {
    console.log(this.$parent.$options.name)
    this.$refs.comBbb.testMethods()
  },
  components: {
    comBbb: baseB
  },
  methods: {
    handleChange () {
      this.prop1 += '~'
    }
  },
  data: {
    text: 23333,
    prop1: 'text1'
  },
  template:
  `
  <div>
    <span>{{text}}</span>
    <com-bbb ref="comBbb" :prop-one="prop1" @change="handleChange"></com-bbb>
  </div>
  `
})
