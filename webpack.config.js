const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// https://www.sitepoint.com/beginners-guide-webpack-module-bundling/

module.exports = {

    entry: {
        main: './src/index.ts',
    },

    output: {
        // pathinfo: false,
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: false
                        }
                    }
                ]
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: false,
                            experimentalWatchApi: true,
                        },
                    },
                ],
            },
            {
                test: /\.s?css$/,
                use: [{loader: 'style-loader'}, {loader: 'css-loader'}, {loader: 'sass-loader'}]
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(['dist']),

        new HtmlWebPackPlugin({
            template: './src/index.html',
        })
    ]

};
