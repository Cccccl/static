const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')
const createVueLoaderOptions = require('./vue-loader.config.js')
const ExtractPlugin = require('extract-text-webpack-plugin')

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
    entry: path.join(__dirname, '../repertory/index.js'),
    devtool: '#cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: createVueLoaderOptions(isDev)
        },
        {
          test: /\.(gif|jpg|jpeg|png|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 1024,
                name: 'resources/[path][name].[hash:4].[ext]'
              }
            }
          ]
        },
        {
          test: /\.less$/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'less-loader'
          ]
        }
      ]
    },
    devServer,
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {
  config = merge(baseConfig, {
    entry: path.join(__dirname, '../repertory/index.js'),
    output: {
      filename: '[name].[chunkhash:8].js',
      path: path.join(__dirname, '../dist/repertory'),
      publicPath: './'
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: createVueLoaderOptions(isDev)
        },
        {
          test: /\.(gif|jpg|jpeg|png|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 1024,
                name: 'resources/[path][name].[hash:4].[ext]'
              }
            }
          ]
        },
        {
          test: /\.less$/,
          use: ExtractPlugin.extract({
            fallback: 'vue-style-loader',
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              'less-loader'
            ]
          })
        }
      ]
    },
    plugins: defaultPlugins.concat([
      new ExtractPlugin('styles.[contentHash:8].css'),
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
