const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const DedupePlugin = webpack.optimize.DedupePlugin;
const OccurrenceOrderPlugin = webpack.optimize.OccurrenceOrderPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

const config = {
  devtool: false,
  context: path.join(__dirname, 'app'),
  entry: {
    main: './js/main.js',
    vendor: './js/vendor/bootstrap.js'
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'js/[name].js'
  },
  plugins: [
    new ExtractTextPlugin('css/style.[contenthash].css'),
    new CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    new UglifyJsPlugin(),
    new DedupePlugin(),
    new OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'app/views', 'index.html'),
      chunks: ['vendor', 'main'],
      hash: false,
      cache: true
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.join(__dirname, 'app'),
        exclude: /node_modules$/,
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'image-webpack'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style',
          loader: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      }
    ]
  }

};
module.exports = config;
