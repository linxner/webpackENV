'use strict';

const config = require('../config/webpack.config.dev');
const webpack = require('webpack');
const paths = require('../config/paths');
const webpackDevServer=require('webpack-dev-server');
const createDevServerConfig = require('../config/webpackDevServer');

// config.entry.unshift("webpack-dev-server/client?http://localhost:7000/");
webpackDevServer.addDevServerEntrypoints(config, createDevServerConfig);
const compiler = webpack(config);
// const compiler = webpack(config);
// const server = new webpackDevServer(compiler, options);

const devServer=new webpackDevServer(compiler,createDevServerConfig)
// compiler.run((err, stats) => {
//     if(err){
//         console.log(err)
//     }
// })
// const watching = compiler.watch({
//     // watchOptions 示例
//     aggregateTimeout: 300,
//     poll: undefined
// }, (err, stats) => {
//     // 在这里打印 watch/build 结果...
//     // console.log(stats);
// });
devServer.listen(7000,'localhost',function (err) { 
    if(err){
        console.log(err)
    }
    console.log('successful...')
 })