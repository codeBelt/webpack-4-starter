const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// https://www.sitepoint.com/beginners-guide-webpack-module-bundling/

module.exports = {

    entry: {
        main: './src/index.ts',
    },

    output: {
        // pathinfo: false,
        filename: '[name].bundle.js', // '[name].[chunkhash].js'
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },

    module: {
        rules: [
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
    ]

};
