const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js')

module.exports = merge.smart({
   mode: 'development',
   devtool: 'cheap-module-source-map',
   output: {
      filename: 'static/js/bundle-[hash].js',
   },
   module: {
      rules: [
         { test: /\.global\.(css|scss|sass)$/, use: ['style-loader'] },
         { test: /^((?!\.global).)*\.(css|scss|sass)$/, use: ['style-loader'] },
      ],
   },
   devServer: {
      hot: true,
      historyApiFallback: true,
      disableHostCheck: true,
      proxy: {
         '/ajax': {
            target: 'http://localhost:8070/',
            pathRewrite: { '^/ajax': '' }
         }
      }
   },
   plugins: [
      new webpack.NamedModulesPlugin(),
   ]
}, common);
