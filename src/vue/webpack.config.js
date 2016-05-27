var path = require('path');
var fs = require('fs');
var webpack = require('webpack');

var entry = {};

function walk(dir, root) {
  var directory = path.join(__dirname, root, dir);
  fs.readdirSync(directory)
    .forEach(function(file) {
      var fullpath = path.join(directory, file);
      var stat = fs.statSync(fullpath);
      var extname = path.extname(fullpath);
      if (stat.isFile() && extname === '.vue') {
        var name = path.join('dist', dir, path.basename(file, extname));
        entry[name] = fullpath + '?entry=true';
      } else if (stat.isDirectory() && file !== 'components') {
        var subdir = path.join(dir, file);
        walk(subdir, root);
      }
    });
}
walk('./', 'examples');

var banner = '// { "framework": "Vue" }\n'

var bannerPlugin = new webpack.BannerPlugin(banner, {
  raw: true
})

module.exports = {
  entry: entry,
  output : {
    path: __dirname,
    filename: '[name].js'
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
