const dotenv = require('dotenv');
const path = require('path');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const SriPlugin = require('webpack-subresource-integrity');
const TerserPlugin = require('terser-webpack-plugin');
const packageJson = require('./package.json');

dotenv.config({path: '.env.prod'});

const {NODE_ENV} = process.env;

module.exports = {
  mode: NODE_ENV,
  entry: {
    app: [
      path.resolve('src/styles', 'index.scss'),
      path.resolve('src', 'game.js')
    ]
  },
  output: {
    path: path.join(__dirname, 'dist/assets/js'),
    publicPath: './assets/js',
    filename: '[name].bundle.js',
    crossOriginLoading: 'anonymous'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        extends: './babel.config.js'
      }
    }, {
      test: /\.(sa|sc|c)ss$/,
      use: [
        'style-loader',
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../css/'
          }
        },
        'css-loader',
        'sass-loader'
      ]
    }, {
      test: /\.(bin|gltf|jpe?g|png)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]'
      }
    }]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
      VERSION: JSON.stringify(packageJson.version)
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CaseSensitivePathsPlugin(),
    new MiniCssExtractPlugin({
      filename: '../css/[name].bundle.css',
      chunkFilename: '[id].bundle.css'
    }),
    new SriPlugin({
      hashFuncNames: ['sha256', 'sha384'],
      enabled: true
    }),
    new HtmlWebpackPlugin({
      template: path.resolve('public', 'index.html'),
      filename: '../../index.html',
      hash: true,
      inject: true,
      chunksSortMode: 'auto'
    })
  ]
};
