'use strict';

const fs = require('fs-extra');
const config = require('../config/webpack.config.prod');
const webpack = require('webpack');
const paths =require('../config/paths');


let compiler = webpack(config);
compiler.run((err,stats) => {
    if(err){
        console.log(err)
    }
})

function copyPublicFolder() {
    fs.copySync(paths.appSrc+'/static', paths.appBuild+'/static', {
        dereference: true,
        filter: file => file !== paths.appHtml,
    });
}
copyPublicFolder()