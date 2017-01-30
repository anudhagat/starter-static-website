
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.dev.config');
const path = require('path');
const open = require('open');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  contentBase: path.join(__dirname, 'public'),
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }
  open('http://localhost:3000/');
  console.log('Listening at http://localhost:3000/');
});
