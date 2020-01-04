const path = require('path');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const packageJson = require('./package.json');

const {NODE_ENV, DEV_SERVER_PORT} = process.env;

module.exports = {
  mode: NODE_ENV,
  devtool: 'cheap-module-source-map',
  devServer: {
    disableHostCheck: true,
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
    hot: true,
    inline: true,
    port: DEV_SERVER_PORT,
    overlay: true
  },
  entry: {
    app: [
      path.resolve('src/styles', 'index.scss'),
      path.resolve('src', 'game.js')
    ]
  },
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        extends: './babel.config.js',
        cacheDirectory: '.babel-cache'
      }
    }, {
      test: /\.(sa|sc|c)ss$/,
      use: [
        'css-hot-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
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
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
      VERSION: JSON.stringify(packageJson.version)
    }),
    new HtmlWebpackPlugin({
      template: path.resolve('public', 'index.html'),
      hash: true,
      inject: true
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ]
};
