const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
   template: './public/index.html',
   filename: 'index.html',
   inject: 'body'
});

const postCssLoader = {
   loader: 'postcss-loader',
   options: {
      config: {
         path: './config/postcss.config.js'
      }
   }
}

const imgLoader = {
   loader: 'url-loader',
   options: { 
      limit: 8000,
      name: 'static/media/[hash]-[name].[ext]'
   }
}

module.exports = {
   devtool: 'cheap-module-source-map',
   entry: path.resolve(__dirname, '../src/index.js'),
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'static/js/bundle.js'
   },
   module: {
      rules: [
         { test: /\.(js|jsx)$/, use: [{loader: 'babel-loader', options: {cacheDirectory: true}}], exclude: /node_modules/ },
         { test: /\.css$/, use: [ 'style-loader', 'css-loader', postCssLoader ] },
         { test: /\.scss$/, use: [ 'style-loader', 'css-loader', 'sass-loader', postCssLoader ] },
         { test: /\.(png|jp(e*)g|svg|ico)$/, use: [ imgLoader ] },
      ],
   },
   plugins: [HtmlWebpackPluginConfig],
   resolve: {
      alias: {
         '~': path.resolve(__dirname, '../src')
      }
   },
}