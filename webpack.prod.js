const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const buildPath = path.resolve(__dirname, 'pollio');

const outFile = (fileExtention) => (entryName) => (entryName.chunk.name == 'index' ? 'index' : entryName.chunk.name + '/' + entryName.chunk.name) + fileExtention;  


module.exports = {
    devtool: "source-map",

    entry: {
        index: './pages/main-page/index.js',
        poll_management: './pages/poll-management/index.js',
        poll_results: './pages/poll-results/index.js',
        poll_vote: './pages/poll-vote/index.js',
        sign_up: './pages/sign-up/index.js',
        poll_creation: './pages/poll-creation/index.js',
    },

    output: {
        filename: outFile('.[hash:20].js'),
        path: buildPath,
        clean: true
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
          template: './pages/main-page/index.html',
          inject: true,
          chunks: ['index'],
          filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            template: './pages/poll-management/index.html',
            inject: true,
            chunks: ['poll_management'],
            filename: 'poll_management/index.html'
        }),
        new HtmlWebpackPlugin({
            template: './pages/poll-results/index.html',
            inject: true,
            chunks: ['poll_results'],
            filename: 'poll_results/index.html'
        }),
        new HtmlWebpackPlugin({
            template: './pages/poll-vote/index.html',
            inject: true,
            chunks: ['poll_vote'],
            filename: 'poll_vote/index.html'
        }),
        new HtmlWebpackPlugin({
            template: './pages/sign-up/index.html',
            inject: true,
            chunks: ['sign_up'],
            filename: 'sign_up/index.html'
        }),
        new HtmlWebpackPlugin({
            template: './pages/poll-creation/index.html',
            inject: true,
            chunks: ['poll_creation'],
            filename: 'poll_creation/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: outFile(".[contenthash].css"),
            chunkFilename: "[id].[contenthash].css"
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    sourceMap: true
                }
            }),
            new OptimizeCssAssetsPlugin({})
        ]
    }
};