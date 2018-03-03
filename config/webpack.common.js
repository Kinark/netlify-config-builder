const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
   template: './public/index.html',
   filename: 'index.html',
   inject: 'body'
});

const imgLoader = {
   loader: 'url-loader',
   options: { 
      limit: 8000,
      name: 'static/media/[hash]-[name].[ext]'
   }
}

module.exports = {
   entry: path.resolve(__dirname, '../src/index.js'),
   output: {
      publicPath: '/'
   },
   module: {
      rules: [
         { test: /\.(js|jsx)$/, use: [{loader: 'babel-loader', options: {cacheDirectory: true}}], exclude: /node_modules/ },
         { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
         { test: /\.scss$/, use: [ 'style-loader', 'css-loader', 'sass-loader' ] },
         { test: /\.(png|jp(e*)g|svg|ico)$/, use: [ imgLoader ] },
      ],
   },
   plugins: [HtmlWebpackPluginConfig],
   resolve: {
      alias: {
         '~': path.resolve(__dirname, '../src'),
         'request$': 'xhr',
      }
   },
}