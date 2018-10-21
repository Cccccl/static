/*
 * 2018.9.6.vue computed watch
 *
 * computed 是有缓存的。
 * methods 方法在页面发生变化的时候每次都会重新调用，浪费性能这点和在computed上面比较来看。
 * computed 只有在计算的值发生变化的时候才会执行，才会计算。提高性能。
 * computed 一般用在，我们拿到的数据并不是我们直接要显示的数据，我们要显示的数据需要经过拼接或者处理之后得到数据。
 * computed get set
 *
 * watch 方面一开始默认是不执行的。
 * 如果要在页面初始的时候就执行一次的话，需要写成handler的形式，并且immediate 赋值为true
 * watch 和 computed 相比，在显示某一个数据方面是没有优势的。
 * watch 监听某一个值的变化，给后台发一个请求。（做某一个指定的操作）
 * 默认只是监听 给某个属性赋值的时候的变化， obj是一个对象, 直接改变对obj的赋值watch是可以监听到的。改变对象内部属性是不能被监听到的，如果需要，需要添加deep。
 * watch监听的时候，不应该在监听的回调函数里面对监听的值做处理。
 */
import Vue from 'vue'
new Vue({
  el: '#root',
  template:
  `
  <div>
    <p>Name: {{name}}</p>
    <p>Name: {{getName()}}</p>
    <p>Number: {{number}}</p>
    <p>FullName： {{fullName}}</p>
    <p><input type="text" v-model="number"></p>
    <p>firstName <input type="text" v-model="firstName"></p>
    <p>lastName <input type="text" v-model="lastName"></p>
    <p>obj.a<input type="text" v-model ="obj.a"></p>
  </div>
  `,
  data: {
    firstName: 'Jokcy',
    lastName: 'Lou',
    number: 0,
    fullName: '',
    obj: {
      a: '123'
    }
  },
  computed: {
    name: function () {
      console.log('new name')
      return `${this.firstName} ${this.lastName}`
    }
  },
  methods: {
    getName: function () {
      console.log('getName invoked!')
      return `${this.firstName} ${this.lastName}`
    }
  },
  watch: {
    // firstName (newName, oldName) {
    //   this.fullName = newName + ' ' + this.lastName
    // }
    firstName: {
      handler  (newName, oldName) {
        this.fullName = newName + ' ' + this.lastName
        console.log('fullname invoked!')
      },
      immediate: true,
      deep: true
    },
    obj: {
      handler  (newName, oldName) {
        // this.fullName = newName + ' ' + this.lastName
        console.log('obj.a changed!')
      },
      immediate: true,
      deep: true
    },
    'obj.a': {
      handler  (newName, oldName) {
        // this.fullName = newName + ' ' + this.lastName
        console.log('obj.a changed!!!!!!!!!!!')
      },
      immediate: true
    }
  }
})
