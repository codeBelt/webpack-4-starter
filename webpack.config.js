const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// https://www.sitepoint.com/beginners-guide-webpack-module-bundling/

module.exports = (env, argv) => {
    const NODE_ENV = argv.mode || 'production';
    const isProduction = (NODE_ENV === 'production');
    const isDevelopment = (NODE_ENV === 'development');

    return {

        entry: {
            main: './src/index.ts',
        },

        output: {
            // pathinfo: false,
            filename: isDevelopment
                ? 'main.js'
                : '[name].[hash].js',
            path: path.resolve(__dirname, 'dist')
        },

        resolve: {
            extensions: ['.tsx', '.ts', '.js', ".css", ".scss"]
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
                    use: [
                        isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                camelCase: 'dashes',
                                minimize: true
                            }
                        },
                        'sass-loader',
                    ]
                }
            ]
        },

        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
            }),

            new webpack.HotModuleReplacementPlugin(),

            new CleanWebpackPlugin(['dist']),

            new HtmlWebPackPlugin({
                template: './src/index.html',
            }),

            new MiniCssExtractPlugin({
                filename: isDevelopment
                    ? 'assets/styles/main.css'
                    : 'assets/styles/[name].[hash].css',
            })

        ],

        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        enforce: true,
                        chunks: 'all'
                    }
                }
            }
        },

        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            hot: true,
            port: 9000
        },

    }
};
