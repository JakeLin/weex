var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './index.js',
  output: {filename: 'dist.js'},
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: [
          path.resolve(__dirname, 'weex.js')
        ],
        loader: 'babel?presets[]=es2015'
      }
    ]
  },
  resolve: {
    alias: {'vue': './weex.js'}
  }
}
