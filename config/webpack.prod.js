const path = require('path');
// const glob = require('glob')

const MinifyJsPlugin = require('babel-minify-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const PurifyCSSPlugin = require('purifycss-webpack');

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const ManifestPluginConfig = {
   fileName: 'asset-manifest.json'
}

module.exports = merge.smart({
   mode: 'production',
   output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'static/js/bundle.js',
   },
   module: {
      rules: [
         { test: /\.global\.(css|scss|sass)$/, use: [MiniCssExtractPlugin.loader] },
         { test: /^((?!\.global).)*\.(css|scss|sass)$/, use: [MiniCssExtractPlugin.loader] },
      ],
   },
   plugins: [
      new MinifyJsPlugin(),
      new CleanWebpackPlugin(['dist/**/*'], { root: path.resolve(__dirname, '../') }),
      new ImageminPlugin(),
      new ManifestPlugin(ManifestPluginConfig),
      new MiniCssExtractPlugin({ filename: 'static/css/[name].css', chunkFilename: '[id].css' }),
      // new PurifyCSSPlugin({
      //    paths: glob.sync(path.join(__dirname, '../src/**/*.js')),
      //    purifyOptions: { info: true, minify: true, whitelist: ['*purify*'] }
      // }),
      new CopyPlugin([{ from: './public/_redirects', to: './' }]),
      new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false })
   ],
}, common);
