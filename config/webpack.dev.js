const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

process.env.NODE_ENV = 'development';

module.exports = merge(common, {
   mode: 'development',
   devtool: 'cheap-module-source-map',
   output: {
      filename: 'static/js/bundle-[hash].js',
   },
   devServer: {
      hot: true,
      historyApiFallback: true,
      disableHostCheck: true,
      proxy: {
         "/ajax": {
            target: "http://localhost:8070/",
            pathRewrite: { "^/ajax": "" }
         }
      }
   },
   plugins: [
      new webpack.NamedModulesPlugin(),
   ]
});
