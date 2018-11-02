'use strict';

const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
module.exports = {
    // dotenv: resolveApp('.env'),
    appBuild: resolveApp('build'),
    // appPublic: resolveApp('src'),
    appHtml: resolveApp('src/index.html'),
    appIndexJs: resolveApp('src/js/index.js'),
    appPackageJson: resolveApp('package.json'),
    appSrc: resolveApp('src'),
    // yarnLockFile: resolveApp('yarn.lock'),
    // testsSetup: resolveApp('src/setupTests.js'),
    appNodeModules: resolveApp('node_modules'),
    // publicUrl: getPublicUrl(resolveApp('package.json')),
    // servedPath: getServedPath(resolveApp('package.json')),
};