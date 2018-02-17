// const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CleanWebpackPlugin = require('clean-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
   template: path.resolve('public/index.html'),
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
   entry: './src/index.js',
   output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'static/js/bundle.js'
   },
   module: {
      rules: [
         { test: /\.(js|jsx)$/, use: ['babel-loader'], exclude: /node_modules/ },
         { test: /\.css$/, use: [ 'style-loader', 'css-loader', postCssLoader ] },
         { test: /\.scss$/, use: [ 'style-loader', 'css-loader', 'sass-loader', postCssLoader ] },
         { test: /\.(png|jp(e*)g|svg|ico)$/, use: [ imgLoader ] },
      ],
   },
   resolve: {
      alias: {
         '~': path.resolve(__dirname, '../src')
      }
   },
   plugins: [
      new CleanWebpackPlugin(['dist/*.*'], {root: path.resolve(__dirname, '../')}),
      new ImageminPlugin({
         disable: process.env.NODE_ENV !== 'production', // Disable during development
         pngquant: {
            quality: '95-100'
         }
      }),
      HtmlWebpackPluginConfig,
      new UglifyJsPlugin(),
      new ManifestPlugin({
         fileName: 'asset-manifest.json'
      }),
      new CompressionPlugin({
         asset: "[path].gz[query]",
         algorithm: "gzip",
         test: /\.js$|\.css$|\.html$/,
         threshold: 10240,
         minRatio: 0.8
      })
   ],
}