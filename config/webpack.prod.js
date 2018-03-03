const path = require('path');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ManifestPlugin = require("webpack-manifest-plugin");
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CleanWebpackPlugin = require('clean-webpack-plugin');

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const postCssLoader = {
   loader: 'postcss-loader',
   options: {
      config: {
         path: './config/postcss.config.js'
      }
   }
}

const ManifestPluginConfig = {
   fileName: 'asset-manifest.json'
}

const ImageminPluginConfig = {
   disable: process.env.NODE_ENV !== 'production', // Disable during development
   pngquant: {
      quality: '95-100'
   }
}

process.env.NODE_ENV = 'production';

module.exports = merge(common, {
   output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'static/js/bundle.js',
   },
   module: {
      rules: [
         // { test: /\.css$/, use: [ 'style-loader', 'css-loader', postCssLoader ] },
         { test: /\.css$/, use: [ postCssLoader ] },
         // { test: /\.scss$/, use: [ 'style-loader', 'css-loader', postCssLoader, 'sass-loader' ] },
         { test: /\.scss$/, use: [ postCssLoader, 'sass-loader' ] },
      ],
   },
   plugins: [
      new CleanWebpackPlugin(['dist/*.*'], {root: path.resolve(__dirname, '../')}),
      new ImageminPlugin(ImageminPluginConfig),
      new UglifyJsPlugin(),
      new ManifestPlugin(ManifestPluginConfig),
   ],
});