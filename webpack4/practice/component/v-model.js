/*
 * 2018.9.6.vue v-model
 * 在组件里面如果实现v-model双向绑定的支持。
 */

import Vue from 'vue'

const componenta = {
  name: 'comA',
  template:
  `
  <div>
    <input type="text" :value="value1" @input="handleInput">
  </div>
  `,
  model: {
    prop: 'value1',
    event: 'ccc1l'
  },
  props: ['value1'],
  methods: {
    handleInput (e) {
      this.$emit('ccc1l', e.target.value)
    }
  }
}

const componentb = {
  name: 'comB',
  template:
  `
  <div>
    <input type="text" :value="valueb" @input="inputHandle">
  </div>
  `,
  props: ['valueb'],
  methods: {
    inputHandle: function (e) {
      this.$emit('inputfff', e.target.value)
    }
  }
}

new Vue({
  components: {
    CompOne: componenta,
    CompTwo: componentb
  },
  data: {
    valueaaaa: '123',
    valuebbbb: '222'
  },
  el: '#root',
  // 使用v-model 等价于使用 :value 和 @input
  template:
  `
  <div>
    <comp-one v-model="valueaaaa"></comp-one>
    <comp-two :valueb="valuebbbb" @inputfff="val => { valuebbbb = val }"></comp-two>
  </div>
  `
})
