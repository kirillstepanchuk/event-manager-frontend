const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common('dev'), {
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    port: 3001,
  },
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
  },
});
