'use strict'
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const rm = require('rimraf')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

console.log(__dirname + '../src/main.js')
console.log(path.resolve(__dirname, '../src/main.js'))
module.exports = {
  entry: __dirname + '/../src/main.js',
  output: {
    filename: 'bundle.js',
    path: resolve('dist'),
    // publicPath: ""
  },
  devtool: "eval-source-map",
  resolve: {
    // extensions: ['js', 'json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(htm|html)$/i,
        use: [{
          loader: 'html-withimg-loader'
        }]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'static/img/[name].[hash:8].[ext]',
          }
        }]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name].[ext]'
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        include: /\src/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.(css|less)$/,
        // use: ['style-loader', 'css-loader']
        use: [
          'style-loader', 'css-loader', {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9',
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          }, 'less-loader'
        ],
      },
    ],
  },
  devServer: {
    disableHostCheck: true,
    clientLogLevel: 'warning',
    contentBase: '../dist',
    watchContentBase: true,
    hot: true,
    host: 'localhost',
    port: 8090,
    open: true,
    noInfo: true,
    quiet: true,
    stats: {
      colors: true
    }
  },
  mode: "development",
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html', //本地自定义模板
      inject: true
    }),
    new CopyWebpackPlugin([ //复制你的静态文件，就是仅仅是复制那些你不需要处理的文件
      {
        from: resolve('static'), //从static中
        to: resolve('dist'), //复制到dist下
        ignore: ['.*']
      }
    ])
  ],

}