/*
 * 2018.9.6.vue 数据绑定
 */
import Vue from 'vue'

new Vue({
  el: '#root',
  template:
  `
  <div>
    <div class="abc" :class="[{active: !isActive}]">
      <p v-html ="html"></p>
      <p :style="styles">{{getJoinArr(arr)}}</p>
    </div>
    <div :id="aaa" v-on:click="handleClick">
      {{html}}
      <p v-html="html"></p>
    </div>
  </div>
  `,
  data: {
    isActive: false,
    html: '<span>123</span>',
    aaa: 'main',
    arr: [1, 2, 3],
    styles: {
      color: 'red',
      appearance: 'none'
    }
  },
  computed: {
    classNames: function () {

    }
  },
  methods: {
    handleClick: function () {
      console.log('clicked')
    },
    getJoinArr (arr) {
      return arr.join(' ')
    }
  }
})
