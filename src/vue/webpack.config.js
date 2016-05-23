var webpack = require('webpack')

var banner = '// { "framework": "Vue" }\n'

var bannerPlugin = new webpack.BannerPlugin(banner, {
  raw: true
})

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
  },
  plugins: [bannerPlugin]
}
