const path = require('path');

module.exports = {
    entry: './src/index.ts',
    output: {
        // pathinfo: false,
        filename: 'bundle.js',
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
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    }
};
