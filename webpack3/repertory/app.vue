<template>
  <div @click="test">
    test
  </div>
</template>
<script>
export default {
  created: function () {
  },
  methods: {
    test: function () {
      this.$alert({
        title: '提示2',
        content: '这里是提示内容2'
      }).then((data) => {
        if (data === 'success') {
          this.name = '守候success'
        } else if (data === 'cancel') {
          this.name = 'cancel~~~'
        }
        console.log(this.name)
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
