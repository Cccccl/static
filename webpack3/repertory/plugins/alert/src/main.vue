<template>
  <transition name="alert" v-on:after-leave="afterLeave">
    <div
      :class="[
        'alert',
        type ? `alert--${ type }` : '',
      ]"
      v-show="visible"
    >
      <div class="box">
        <div class="box-inner">
          <div class="alert__title" v-if="title">{{title}}</div>
          <div class="alert__content">{{content}}</div>
        </div>
        <div class="box-buttons">
          <span class="alert__btn-success" @click="success">{{submitText}}</span>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'alert',
  data () {
    return {
      visible: false,
      title: '默认标题',
      content: '默认内容',
      submitText: '确定',
      cancelText: '取消',
      type: 'info'
    }
  },
  methods: {
    hide () {
      this.visible = false
    },
    show () {
      this.visible = true
    },
    cancel () {
    },
    success () {
    },
    afterLeave: function (el) {
      this.$emit('closed')
    }
  }
}
</script>
<style lang="less" scoped>
.alert{
  background: rgba(0,0,0,0.5);
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  .box{
    width: 80%;
    max-width: 400px;
    top: 200px;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    background: #fff;
    box-sizing: border-box;
    padding: 20px;
    border-radius: 6px;
  }
  .alert__title{
    padding-left: 0;
    margin-bottom: 0;
    font-size: 16px;
    font-weight: 700;
    height: 18px;
    color: #333;
  }
  .alert__content{
    padding: 14px 0;
    line-height: 24px;
    color: #48576a;
    font-size: 14px;
  }
  .box-buttons{
    text-align: right;
  }
  .alert__btn-success{
    background: #20a0ff;
    border-color: #20a0ff;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    color: #fff;
    margin: 0;
    padding: 10px 15px;
    border-radius: 4px;
    &:hover{
      background: #094673;
      border-color: #094673;
      color: #fff;
      cursor: pointer;
    }
  }
}
.alert--info .alert__content{color:#909399}
.alert--success .alert__content{color:#67c23a}
.alert--warning .alert__content{color:#e6a23c}
.alert--error .alert__content{color:#f56c6c}
.alert-enter, .alert-leave-to{
  opacity: 0;
}
.alert-enter-active{
  transition: opacity 2s;
}
.alert-leave-active{
  transition: opacity 2s;
}
</style>
