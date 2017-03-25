var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CordovaPlugin = require('webpack-cordova-plugin');

module.exports = {
  entry: './webcontent/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Mon super fichier',
      template: './webcontent/index.html'
    }),
    new CopyWebpackPlugin([{
      from: './specifics/config.xml',
      to: '../config.xml'
    }]),
    new CordovaPlugin({
      config: 'cordova/config.xml',  // Location of Cordova' config.xml (will be created if not found)
      src: 'index.html',     // Set entry-point of cordova in config.xml
      platform: 'android',
      version: true,         // Set config.xml' version. (true = use version from package.json)
    })
  ]
};