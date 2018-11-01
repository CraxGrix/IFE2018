// wenbpack.config.js
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin') // 【1】 引入了我们安装的插件
var webpack = require('webpack')
const isDev = process.env.NODE_ENV === 'development'

const config = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // 生成文件名
      template: './src/index.html', // 模板文件
      inject: 'body' // js插入的位置
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}

if (isDev) {
  config.devServer = {
    host: 'localhost', // 服务器的IP地址，可以使用IP也可以使用localhost
    compress: true, // 服务端压缩是否开启
    port: 3038, // 端口
    hot: true,
    open: true
  }
}

module.exports = config
