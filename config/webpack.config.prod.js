'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const paths=require('./paths');


console.log(paths.appIndexJs)
module.exports = {
    entry: paths.appIndexJs,
    module: {
        rules: [{
                test: /\.(htm|html)$/i,
                use: [{
                    loader: 'html-withimg-loader'
                }]
            }, {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'static/images/[name].[hash:8].[ext]',
                    }
                }]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                include: [path.resolve('src'), path.resolve('static/js/bundle.js')],
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.(css|less)$/,
                loader: ExtractTextPlugin.extract(
                    Object.assign({
                        fallback: {
                            loader: require.resolve('style-loader'),
                            options: {
                                hmr: false,
                            },
                        },
                        use: [{
                                loader: require.resolve('css-loader'),
                                options: {
                                    importLoaders: 1,
                                    minimize: true
                                },
                            },
                            {
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
                            },
                            {
                                loader: require.resolve('less-loader'),
                            },
                        ],
                    }, )
                ),
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: paths.appHtml,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
        }),
        // new webpack.ProvidePlugin({
        //     $: "jquery",
        //     jQuery: "jquery",
        //     "window.jQuery": "jquery"
        // }),
        // new webpack.HotModuleReplacementPlugin(),
        // new webpack.NamedModulesPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,

                comparisons: false,
            },
            mangle: {
                safari10: true,
            },
            output: {
                comments: false,
                ascii_only: true,
            },
        }),
        new ExtractTextPlugin({
            filename: 'static/css/[name].[hash:8].css'
        }),
        new ManifestPlugin({
            fileName: 'asset-manifest.json',
        }),
        new CleanWebpackPlugin('build',{
            root:__dirname
        }),
    ],
    output: {
        filename: 'static/js/[name].[hash:8].js',
        chunkFilename:'static/js/[name].[hash:8].chunk.js',
        path: paths.appBuild,
    },

}