const path = require('path')
const MinCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const webpackconfig = {
    entry: {
        'index'     : './src/page/index/index.js',
        'user-login': './src/page/user-login/index.js',
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new MinCssExtractPlugin({filename: 'css/[name].css'}),
        new HtmlWebpackPlugin({
            template: './src/view/index.html',
            filename: 'view/index.html',
            inject: true,
            hash: true,
            chunks: ['common', 'index'],
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MinCssExtractPlugin.loader, 'css-loader'],
            }
        ],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'common',
                    chunks: 'all',
                    minChunks: 2,
                    minSize: 0
                }
            }
        }
    },
    devServer: {
        static: './dist',
    },
    mode: 'development'
}

module.exports = webpackconfig
