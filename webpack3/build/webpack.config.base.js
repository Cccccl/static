// const path = require('path')
// const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  module: {
    rules: [
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre' // 预处理，使用真正的loader加载之前，先用eslint-loader去处理
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}

module.exports = config
