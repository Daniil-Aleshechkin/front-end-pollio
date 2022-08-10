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
        index: './assets/main-page/index.js',
        poll_management: './assets/poll-management/index.js',
        poll_results: './assets/poll-results/index.js',
        poll_vote: './assets/poll-vote/index.js',
        sign_up: './assets/sign-up/index.js',
        poll_creation: './assets/poll-creation/index.js',
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