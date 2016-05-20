var webpack = require('webpack')

module.exports = {
  entry: './demo.vue?entry',
  output: {
    filename: 'demo.js'
  },
  module: {
    loaders: [
      {
        test: /\.vue(\?[^?]+)?$/,
        loader: 'weex-loader-next'
      }
    ]
  }
}
