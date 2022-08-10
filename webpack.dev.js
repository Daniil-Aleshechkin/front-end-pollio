const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

module.exports = {

    entry: {
        main_page: './assets/main-page/index.js',
        poll_management: './assets/poll-management/index.js',
        poll_results: './assets/poll-results/index.js',
        poll_vote: './assets/poll-vote/index.js',
        sign_up: './assets/sign-up/index.js',
        poll_creation: './assets/poll-creation/index.js',
    },

    devServer: {
        port: 8080
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
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
          template: './assets/main-page/index.html',
          inject: true,
          chunks: ['index'],
          filename: '~dsa005/pollio/index.html'
        }),
        new HtmlWebpackPlugin({
            template: './assets/poll-management/index.html',
            inject: true,
            chunks: ['poll_management'],
            filename: '~dsa005/pollio/poll_management/index.html'
        }),
        new HtmlWebpackPlugin({
            template: './assets/poll-results/index.html',
            inject: true,
            chunks: ['poll_results'],
            filename: '~dsa005/pollio/poll_results/index.html'
        }),
        new HtmlWebpackPlugin({
            template: './assets/poll-vote/index.html',
            inject: true,
            chunks: ['poll_vote'],
            filename: '~dsa005/pollio/poll_vote/index.html'
        }),
        new HtmlWebpackPlugin({
            template: './assets/sign-up/index.html',
            inject: true,
            chunks: ['sign_up'],
            filename: '~dsa005/pollio/sign_up/index.html'
        }),
        new HtmlWebpackPlugin({
            template: './assets/poll-creation/index.html',
            inject: true,
            chunks: ['poll_creation'],
            filename: '~dsa005/pollio/poll_creation/index.html'
        })
    ]

};