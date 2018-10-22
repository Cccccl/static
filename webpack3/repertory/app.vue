<template>
  <div>
    <div @click="test">test</div>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
    }
  },
  methods: {
    test: function () {
      this.$alert({
        title: '提示1',
        content: '这里是提示内容1',
        type: 'success'
      }).then((data) => {
        this.$confirm({
          title: '提示2',
          content: '这里是提示内容2',
          type: 'error'
        }).then((data) => {
          if (data === 'success') {
            this.name = '守候success'
          } else if (data === 'cancel') {
            this.name = 'cancel~~~'
          }
          console.log(this.name)
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
