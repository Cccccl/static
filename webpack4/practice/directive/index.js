/*
 * 2018.9.6.vue directive
 *
 * v-text 一般就是显示为数据里的内容，如果要在便签里多添加内容那么需要拼接字符串，建议使用{{}}
 * v-html, 如果直接使用数据绑定{{}}，会把便签作为字符串全部显示出来，应该使用v-html 才会把便签里的内容显示出来。相当于dom里面的innerHTML 和 innerText的区别
 * v-show 是否要显示,在节点上面添加 display none.
 * v-if 节点不放在dom里。不存在文档流里。推荐使用v-show，v-if会增删节点，会引起重绘，影响性能。
 * v-for 遍历一个数组 如果是一个对象的话 也是可以的。 Object.keys(), 不要用index作为key，他的顺序可能是缓存的顺序。一遍是用后台返回的唯一id.
 * v-on,会自动判断如果是html节点会采用document.addEventListener;如果是vue的组件会通过$on去绑定事件。
 * v-bind
 * v-model, 使用在input上，数据绑定。修饰符（number，trim，lazy）v-model 默认的事件是input事件，每一次有输入都会触发，加上lazy 就会把 input事件变化为 change事件
 * v-pre，div里面的内容都不会去解析，写什么那就是什么。
 * v-cloak ，在vue的项目使用webpack开发的时候用不到。         vue代码还没加载完成之前，隐藏掉。  项目直接通过src引入vue,在body，html里面写vue的代码，在浏览器一开始渲染的时候不认识vue的代码，所以显示{{}}
 * v-once, 数据绑定的内容只执行一次。
 */

import Vue from 'vue'
var data = { a: 1, b: 2, c: 9, d: 4, e: 5 }
console.log(data) // {a: 1, b: 2, c: 9, d: 4, e: 5}
console.log(Object.keys(data)) // ["a", "b", "c", "d", "e"]
new Vue({
  el: '#root',
  template:
  `
    <div>
      <div v-pre> text: {{text}}</div>
      <div v-if="3>2">text: {{text}}
      </div>
      <div v-else>
      else content
      </div>
      <div>
      {{text}}
      </div>
      <div v-html="html">
      </div>
      <ul>
        <li v-for="(item, index) in arr" :key="item">{{item}}:{{index}}</li>
      </ul>
      <ul>
        <li v-for="(val, key, index) in obj" :key="key">{{val}}:{{key}}:{{index}}</li>
      </ul>
      <input type="checkbox" v-model="active">
      <div>
      <input type="checkbox" v-model="arr" :value="1">
      <input type="checkbox" v-model="arr" :value="2">
      <input type="checkbox" v-model="arr" :value="3">
      </div>
      <div>
      <input type="radio" v-model="picked" value="one">
      <input type="radio" v-model="picked" value="two">
      </div>
    </div>
  `,
  data: function () {
    return {
      arr: [1, 2, 3],
      obj: {
        a: '123',
        b: '456',
        c: '789'
      },
      picked: 'one',
      text: 10,
      active: false,
      html: '<span>this is html</span>'
    }
  }
})
