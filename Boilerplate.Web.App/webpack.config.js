﻿const env = process.env.NODE_ENV;
const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: {
        app: './ReactScript/index.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'wwwroot/dist'),
        chunkFilename: '[name].bundle.js',
        publicPath: 'wwwroot/'
    },
    resolve: {        
        extensions: ['.js', '.jsx'],
    },
    node: { fs: 'empty' },
    module: {
        rules: [      

        {
            test: /\.(s?)css$/,
            loader: 'style-loader!css-loader!sass-loader'
        },
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: { loader: "babel-loader?presets[]=react,presets[]=env,presets[]=stage-0" }
        },
        {
            test: /\.html$/,
            use: { loader: "html-loader" }
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: require.resolve('url-loader'),
                options: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            },
            {
                test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
                loader: require.resolve('file-loader'),
                options: {
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            },

        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            BLOG_API: JSON.stringify('http://localhost:58830')
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default']
        }),        
        new ExtractTextPlugin(
            { filename: 'style.bundle.css', disable: false, allChunks: true }
        ),
        new HtmlWebPackPlugin({
            inject: false,
            hash: true,
            template: "./Views/Home/index.cshtml",
            filename: "index.html",
            favicon: './wwwroot/favicon.ico'
        })
    ]
};