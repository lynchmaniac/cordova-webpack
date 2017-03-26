var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CordovaPlugin = require('webpack-cordova-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
var ReplacePlugin = require('replace-webpack-plugin');
var HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin');
var StringReplacePlugin = require("string-replace-webpack-plugin");
var ImageminPlugin = require('imagemin-webpack-plugin').default

module.exports = {
  entry: './webcontent/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
      rules: [
        {
          test: /\.json$/,
          use: 'json-loader'
        }
      ],
      /*loaders: [
         // configure replacements for file patterns
        { test: /\.(jsx|js)$/,
          loader: StringReplacePlugin.replace({
            replacements: [
                {
                    pattern: /@@AAAAAAAA@@/ig,
                    replacement: function (match, p1, offset, string) {
                      console.log('YOUYOUYOUYOUYOUYOYOYU')
                        return 'myUrls[process.env.NODE_ENV]';
                    }
                }
            ]})
        }
      ]*/
   },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/alertDismissed/, 'sdvlsdnkvlksndvlknsdvlnsdvlnsvleznvkl'),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new ImageminPlugin({ test: './webcontent/img/**' }),
    new ImageminPlugin({
      test: './webcontent/img/**',
      disable: false, //process.env.NODE_ENV !== 'production', // Disable during development
      pngquant: {
        quality: '95-100'
      }
    }),
    //new StringReplacePlugin(),
    //new WebpackShellPlugin({onBuildStart:['npm run plugin'], onBuildEnd:['echo "Webpack End"']}),
    new HtmlWebpackPlugin({
      title: 'Mon super fichier',
      template: './webcontent/index.html'
    }),
    new CopyWebpackPlugin([{
      from: './specifics/config.xml',
      to: '../config.xml'
    }]),
    new WebpackShellPlugin({onBuildStart:['npm run p']}),
    new CopyWebpackPlugin([{
      from: './webcontent/img/**',
      to: './img/',
      flatten: true
    }]),
     new CopyWebpackPlugin([{
      from: './specifics/android/res/values/**',
      to: '../platforms/android/res/values/',
      flatten: true
    }]),
    new CopyWebpackPlugin([{
      from: './webcontent/css/**',
      to: './css/',
      flatten: true
    }]),
    new CordovaPlugin({
      config: 'cordova/config.xml',  // Location of Cordova' config.xml (will be created if not found)
      src: 'index.html',     // Set entry-point of cordova in config.xml
      platform: 'android',
      version: true,         // Set config.xml' version. (true = use version from package.json)
    }),
    new ReplacePlugin({
      skip: process.env.NODE_ENV === 'development',
      entry: './specifics/config.xml',
      output: '/cordova/config.xml',
      data: {
        css: '<link type="text/css" rel="stylesheet" href="styles.css">',
        //js: '<script src="bundle.js"></script>',
        js: '<widget id="io.cordova.hellocordova" version="2.4.9" android-versionCode="200400900" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">'
      }
    }),
    new HtmlReplaceWebpackPlugin([
    {
      pattern: 'foo',
      replacement: '`foo` has been replaced with `bar`'
    },
    {
      pattern: '@@title',
      replacement: 'html replace webpack plugin'
    },
    {
      pattern: '@@yohou',
      replacement: 'trop cool le gars'
    },
    {
      pattern: /(<!--\s*|@@)(css|js|img):([\w-\/]+)(\s*-->)?/g,
      replacement: function(match, $1, type, file, $4, index, input)
      {
        // those formal parameters could be:
        // match: <-- css:bootstrap-->
        // type: css
        // file: bootstrap
        // Then fetch css link from some resource object
        // var url = resources['css']['bootstrap']

        var url = resource[type][file]

        // $1==='@@' <--EQ--> $4===undefined
        return $4 == undefined ? url : tpl[type].replace('%s', url)
      }
    }])
  ]
};