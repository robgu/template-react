const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractLess = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  disable: false,
});

module.exports = {
  devtool: 'sourcemap',
  entry: [
    'webpack-dev-server/client?http://localhost:8080', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    path.resolve(__dirname, 'src/index.js'),
  ],
  output: {
    publicPath: '/',
    filename: 'bundle.js',
    chunkFilename: '[chunkhash].js',
  },
  resolve: {
    alias: {
    },
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: [{
        loader: 'react-hot-loader/webpack',
      }, {
        loader: 'babel-loader',
      }],
      exclude: /node_modules/,
    }, {
      test: /\.(gif|png|jpe?g|svg)$/,
      loader: 'url-loader?limit=8192&name=static/images/[hash].[ext]',
    }, {
      test: /\.less$/,
      use: extractLess.extract({
        use: [{
          loader: 'css-loader',
        }, {
          loader: 'less-loader',
        }],
        // use style-loader in development
        fallback: 'style-loader',
      }),
    }],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss() {
          autoprefixer({ browsers: ['> 0.04%'] });
        },
        debug: true,
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'template-react',
      template: path.resolve(__dirname, 'src/template.html'),
      inject: true,
    }),
  ],
};
