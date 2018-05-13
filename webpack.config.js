const path = require('path');

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
                test: /\.scss$/,
                use: [{loader: 'style-loader'}, {loader: 'css-loader'}, {loader: 'sass-loader'}]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    }
};
