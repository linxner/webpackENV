'use strict'
const config=require('./webpack.config.dev')
const paths = require('./paths');
const publicPath = '/';
const host = process.env.HOST || '0.0.0.0';
module.exports = {
    disableHostCheck: true,
    clientLogLevel: 'none',
    contentBase: paths.appSrc,
    watchContentBase: true,
    hot: true,
    host:'localhost',
    open: true,
    noInfo:true,
    publicPath: config.output.publicPath,
    quiet:true,
    stats: {
        colors: true
    }
}