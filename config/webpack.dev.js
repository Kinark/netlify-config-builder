const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js')

const cssLoader = {
   loader: 'css-loader',
   query: {
      importLoaders: 1,
      localIdentName: '[local]_[hash:base64:5]',
      minimize: true,
      modules: true
   }
}

module.exports = merge(common, {
   mode: 'development',
   devtool: 'cheap-module-source-map',
   output: {
      filename: 'static/js/bundle-[hash].js',
   },
   module: {
      rules: [
         { test: /\.global\.css$/, use: ['style-loader', 'css-loader'] },
         { test: /\.global\.(scss|sass)$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
         { test: /^((?!\.global).)*\.css$/, use: ['style-loader', cssLoader] },
         { test: /^((?!\.global).)*\.(scss|sass)$/, use: ['style-loader', cssLoader, 'sass-loader'] },
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
});
