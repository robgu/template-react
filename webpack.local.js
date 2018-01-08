const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const PORT = process.env.PORT || 8080;
const {
  BACKEND_PROTOCOL = 'http',
  BACKEND_DOMAIN = '', // TODO
} = process.env;

module.exports = {
  devServer: {
    host: '::',
    port: PORT,
  },
  devtool: 'sourcemap',
  entry: [
    `webpack-dev-server/client?http://[::]:${PORT}`, // WebpackDevServer host and port
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
      '~': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: [
        { loader: 'react-hot-loader/webpack' },
        { loader: 'babel-loader' },
      ],
      exclude: /node_modules/,
    }, {
      test: /\.(gif|png|jpe?g|svg)$/,
      loader: 'url-loader?limit=8192&name=static/images/[hash].[ext]',
    }, {
      test: /\.css$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
      ],
    }, {
      test: /\.less$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
        {
          loader: 'less-loader',
          options: {
            paths: [
              path.resolve(__dirname, 'node_modules'),
              path.resolve(__dirname, 'src'),
            ],
          },
        },
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
    new webpack.DefinePlugin({
      'process.env': {
        BACKEND_PROTOCOL: JSON.stringify(BACKEND_PROTOCOL),
        BACKEND_DOMAIN: JSON.stringify(BACKEND_DOMAIN),
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
