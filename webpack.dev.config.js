const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

const config = {
  devtool: 'source-map',
  context: path.join(__dirname, 'app'),
  entry: {
    main: './js/main.js',
    vendor: './js/vendor/vendor.js'
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'js/[name].js'
  },
  plugins: [
    new ExtractTextPlugin('css/[name].css'),
    new CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'app/views', 'index.html'),
      chunks: ['vendor', 'main'],
      hash: false
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'app/views', 'features.html'),
      filename: 'features/index.html',
      chunks: ['vendor', 'main'],
      hash: false
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'app/views', 'order.html'),
      filename: 'order/index.html',
      chunks: ['vendor', 'main'],
      hash: false
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'app/views', 'support.html'),
      filename: 'support/index.html',
      chunks: ['vendor', 'main'],
      hash: false
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'app/views', 'about.html'),
      filename: 'about/index.html',
      chunks: ['vendor', 'main'],
      hash: false
    }),
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
      },
      {
        test: /\.css$/,
        exclude: /node_modules$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: ['css-loader', 'postcss-loader']
        })
      }
    ]
  }

};
module.exports = config;
