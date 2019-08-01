const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')

module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: [
        'jquery',
        './src/js/index.js'
    ],
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                    loader: 'file-loader',
                    options: {
                        name: './static/[name].bundle.css',
                    }
                },
                {
                    loader: 'extract-loader'
                },
                {
                    loader: 'css-loader?-url'
                },
                {
                    loader: 'postcss-loader'
                },
                {
                    loader: 'sass-loader'
                }
            ]
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Dead Matter | Quantum Integrity Software Inc.',
            template: './src/index.html'
        })
    ],
    resolve: {
        extensions: ['.js', '.scss', '.css']
    },
    devServer: {
        contentBase: './dist'
    },
    output: {
        filename: './js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};