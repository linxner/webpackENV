'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const paths = require('../config/paths');
const publicPath='/';


module.exports = {
    entry: [paths.appIndexJs],
    devtool: 'eval-source-map',
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
                        limit: 10000,
                        name: 'static/media/[name].[hash:8].[ext]',
                    }
                }]
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
                use: [
                    require.resolve('style-loader'), {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                        },
                    }, {
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
                    }, {
                        loader: require.resolve('less-loader'),
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack',
            template: paths.appHtml
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
    ],
    output: {
        filename: 'static/js/[name].[hash:8].js',
        chunkFilename:'static/js/[name].[hash:8].chunk.js',
        path: paths.appBuild,
        publicPath:publicPath
    },
}