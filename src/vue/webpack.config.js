var webpack = require('webpack')

module.exports = {
  entry: './index.js',
  output: {filename: 'dist.js'},
  resolve: {
    alias: {'vue-next': '../../../vue-next/dist/weex.js'} // temp
  }
}
