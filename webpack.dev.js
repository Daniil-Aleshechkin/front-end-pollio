const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

module.exports = {

    entry: {
        index: './pages/main-page/index.js',
        poll_management: './pages/poll-management/index.js',
        poll_results: './pages/poll-results/index.js',
        poll_vote: './pages/poll-vote/index.js',
        sign_up: './pages/sign-up/index.js',
        poll_creation: './pages/poll-creation/index.js',
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
          template: './pages/main-page/index.html',
          inject: true,
          chunks: ['index'],
          filename: '~dsa005/pollio/index.html'
        }),
        new HtmlWebpackPlugin({
            template: './pages/poll-management/index.html',
            inject: true,
            chunks: ['poll_management'],
            filename: '~dsa005/pollio/poll_management/index.html'
        }),
        new HtmlWebpackPlugin({
            template: './pages/poll-results/index.html',
            inject: true,
            chunks: ['poll_results'],
            filename: '~dsa005/pollio/poll_results/index.html'
        }),
        new HtmlWebpackPlugin({
            template: './pages/poll-vote/index.html',
            inject: true,
            chunks: ['poll_vote'],
            filename: '~dsa005/pollio/poll_vote/index.html'
        }),
        new HtmlWebpackPlugin({
            template: './pages/sign-up/index.html',
            inject: true,
            chunks: ['sign_up'],
            filename: '~dsa005/pollio/sign_up/index.html'
        }),
        new HtmlWebpackPlugin({
            template: './pages/poll-creation/index.html',
            inject: true,
            chunks: ['poll_creation'],
            filename: '~dsa005/pollio/poll_creation/index.html'
        })
    ]

};