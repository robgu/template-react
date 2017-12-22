const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

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
  resolve: { alias: { '~': path.resolve(__dirname, 'src') } },
  module: {
    rules: [{
      test: /\.(js)$/,
      use: [
        { loader: 'react-hot-loader/webpack' },
        { loader: 'babel-loader' },
      ],
      exclude: /node_modules/,
    }, {
      test: /\.(gif|png|jpe?g|svg)$/,
      loader: 'url-loader?limit=8192&name=static/images/[hash].[ext]',
    }, {
      test: /\.less$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
        { loader: 'less-loader' },
      ],
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
      filename: 'index.html',
    }),
  ],
};
