const webpack = require('webpack');
const path = require('path');
const webpackConfig = require('./webpack.pro.conf');
const rm = require('rimraf');


function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

rm(resolve('dist'), err => {
  if (err) throw err
  webpack(webpackConfig, err => {
    if (err) throw  err
  })
})
// console.log(webpackConfig)
