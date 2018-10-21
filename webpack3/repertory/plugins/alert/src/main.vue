<template>
  <transition name="alert">
    <div v-if="visible" class="alert">
      <div class="box">
        <div class="box-inner">
          <div class="title" v-if="title">{{title}}</div>
          <div class="content">{{content}}</div>
        </div>
        <div class="box-buttons">
          <span class="btn-success" @click="success">{{submitText}}</span>
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
      title: '标题',
      content: '内容',
      submitText: '确定',
      cancelText: '取消'
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
  .title{
    padding-left: 0;
    margin-bottom: 0;
    font-size: 16px;
    font-weight: 700;
    height: 18px;
    color: #333;
  }
  .content{
    padding: 14px 0;
    line-height: 24px;
    color: #48576a;
    font-size: 14px;
  }
  .box-buttons{
    text-align: right;
  }
  .btn-success{
    background: #20a0ff;
    border-color: #20a0ff;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    color: #fff;
    margin: 0;
    padding: 10px 15px;
    border-radius: 4px;
  }
  .btn-success:hover{
    background: #094673;
    border-color: #094673;
    color: #fff;
    cursor: pointer;
  }
  .btn-cancel{
    background: #ea6c6c;
    border-color: #ea6c6c;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    color: #fff;
    margin: 0;
    padding: 10px 15px;
    border-radius: 4px;
  }
  .btn-cancel:hover{
    background: #a20101;
    border-color: #a20101;
    color: #fff;
    cursor: pointer;
  }
}
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
