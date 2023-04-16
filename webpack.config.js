const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        index: path.resolve('./src/index.tsx'),
        background: path.resolve('./src/background/index.ts')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve('manifest.json'),
                to: path.resolve('build')
            }]
        }),
        new HtmlWebpackPlugin()
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
    devtool: 'cheap-module-source-map'
}