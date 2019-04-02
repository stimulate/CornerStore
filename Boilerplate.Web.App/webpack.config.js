const env = process.env.NODE_ENV;
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
        alias: {
            '../../theme.config$': path.join(__dirname, 'my-semantic-theme/theme.config')
        },
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
        {
            use: ExtractTextPlugin.extract({
                use: ['css-loader', 'less-loader']
            }),
            test: /\.less$/
        },
        // this rule handles images
        {
            test: /\.jpe?g$|\.gif$|\.ico$|\.png$|\.svg$/,
            use: 'file-loader?name=[name].[ext]?[hash]'
        },

        // the following 3 rules handle font extraction
        {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        },

        {
            test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader'
        },
        {
            test: /\.otf(\?.*)?$/,
            use: 'file-loader?name=/fonts/[name].  [ext]&mimetype=application/font-otf'
        },
        {
            test: /\.(s?)css$/,
            loader: 'style-loader!css-loader!sass-loader'
        },
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: { loader: "babel-loader" }
        },
        {
            test: /\.html$/,
            use: { loader: "html-loader" }
        }

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
            filename: "index.html"
        })
    ]
};