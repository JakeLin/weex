var webpack = require('webpack')
var pkg = require('./package.json')

function leftPad(num, len) {
  if (len <= 0) {
    return num
  }
  var numLen = (num + '').length
  if (numLen >= len) {
    return num
  }
  return new Array(len - numLen + 1).join('0') + num
}

function getDateStr() {
  var dt = new Date()
  var y = dt.getFullYear()
  var m = leftPad(dt.getMonth() + 1, 2)
  var d = leftPad(dt.getDate(), 2)
  return y + m + d
}

var sourceMapPlugin = new webpack.SourceMapDevToolPlugin({
  test: /\.js$/
})

var version = pkg.version
var banner = `(this.nativeLog || function(s) {console.log(s)})\
('START WEEX HTML5: ${pkg.version} BUILD ${getDateStr()}');`;

var bannerPlugin = new webpack.BannerPlugin(banner, {
  raw: true
})

module.exports = {
  entry: './src/weex',
  output: {
    path: './dist',
    filename: 'index.js',
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  plugins: [bannerPlugin, sourceMapPlugin]
}
