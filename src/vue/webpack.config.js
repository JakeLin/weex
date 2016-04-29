var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: 'vue',
  output: {
    filename: 'dist.js',
    library: 'Vue',
    libraryTarget: 'umd'
  }
}
