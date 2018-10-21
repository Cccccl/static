const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')

const isDev = process.env.NODE_ENV === 'development'

const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, '../template.html')
  })
]

const devServer = {
  port: 9999,
  host: '0.0.0.0',
  overlay: {
    errors: true
  },
  hot: true
}

let config
if (isDev) {
  config = merge(baseConfig, {
    entry: path.join(__dirname, '../practice/index.js'),
    devtool: '#cheap-module-eval-source-map',
    module: {
      rules: []
    },
    devServer,
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {
  config = merge(baseConfig, {
    entry: path.join(__dirname, '../practice/index.js'),
    output: {
      filename: '[name].[chunkhash:4].js',
      path: path.join(__dirname, '../dist/practice'),
      publicPath: './'
    },
    module: {
      rules: []
    },
    plugins: defaultPlugins.concat([
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime'
      })
    ])
  })
}

config.resolve = {
  // runtime 不能写 template,默认引入 vue.runtime.esm.js
  alias: {
    'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
  }
}

module.exports = config
