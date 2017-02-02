const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const DedupePlugin = webpack.optimize.DedupePlugin;
const OccurrenceOrderPlugin = webpack.optimize.OccurrenceOrderPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const WebpackMd5Hash = require('webpack-md5-hash');
const layouts = require('reshape-layouts');
const include = require('reshape-include');

const config = {
  devtool: false,
  context: path.join(__dirname, 'app'),
  entry: {
    main: './js/main.js',
    vendor: './js/vendor/vendor.js'
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].[chunkhash].js'
  },
  plugins: [
    new ExtractTextPlugin('css/[name].[contenthash].css'),
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
      cache: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'app/views', 'features.html'),
      filename: 'features/index.html',
      chunks: ['vendor', 'main'],
      hash: false,
      cache: true
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'app/views', 'order.html'),
      filename: 'order/index.html',
      chunks: ['vendor', 'main'],
      hash: false,
      cache: true
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'app/views', 'support.html'),
      filename: 'support/index.html',
      chunks: ['vendor', 'main'],
      hash: false,
      cache: true
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'app/views', 'about.html'),
      filename: 'about/index.html',
      chunks: ['vendor', 'main'],
      hash: false,
      cache: true
    }),
    new WebpackMd5Hash(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.LoaderOptionsPlugin({
      test: /\.html$/,
      options: {
        reshape: {
          plugins:
          [
            layouts(),
            include()
          ]
        }
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'reshape-loader'
      },
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
        loaders: [
          'file-loader?name=/images/[name].[ext]',
          {
            loader: 'image-webpack-loader',
            query: {
              progressive: true,
              optimizationLevel: 7,
              interlaced: false,
              pngquant: {
                quality: '65-90',
                speed: 4
              }
            }
          }
        ]
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
