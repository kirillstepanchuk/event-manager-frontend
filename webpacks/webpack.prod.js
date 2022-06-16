const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common('prod'), {
  mode: 'production',
  output: {
    filename: '[chunkhash].js',
    path: path.resolve(__dirname, '../dist'),
  },
});
