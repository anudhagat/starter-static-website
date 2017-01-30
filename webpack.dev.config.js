const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const WebpackMd5Hash = require('webpack-md5-hash');

const config = {
  devtool: 'source-map',
  context: path.join(__dirname, 'app'),
  entry: {
    main: './js/main.js',
    vendor: './js/vendor/bootstrap.js'
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].[chunkhash].js'
  },
  plugins: [
    new ExtractTextPlugin('css/style.[contenthash].css'),
    new CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'app/views', 'index.html'),
      chunks: ['vendor', 'main'],
      hash: false,
      cache: true
    }),
    new WebpackMd5Hash(),
    new webpack.optimize.OccurrenceOrderPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'app'),
        exclude: /node_modules$/,
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: /node_modules$/,
        loader: 'image-webpack'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      }
    ]
  }

};
module.exports = config;
