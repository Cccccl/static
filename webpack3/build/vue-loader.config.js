module.exports = (isDev) => {
  return {
    preserveWhitepace: true,
    // 使用 transformToRequire 再也不用把图片写成变量
    // transformToRequire: {
    //   img: 'src'
    // },
    // 提取 CSS 到单个文件
    extractCSS: !isDev
  }
}
