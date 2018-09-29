const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackHardDiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');
const RobotstxtPlugin = require('robotstxt-webpack-plugin').default;

// https://www.sitepoint.com/beginners-guide-webpack-module-bundling/

module.exports = (env, argv) => {
    const NODE_ENV = argv.mode || 'production';
    const isProduction = (NODE_ENV === 'production');
    const isDevelopment = (NODE_ENV === 'development');

    return {

        entry: {
            main: './src/scripts/main.ts',
        },

        output: {
            pathinfo: false,
            path: path.resolve(__dirname, 'dist'),
            filename: isDevelopment
                ? 'assets/scripts/[name].js'
                : 'assets/scripts/[name].[hash].js',
        },

        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        },

        module: {
            rules: [
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'html-loader',
                            options: {
                                minimize: isProduction
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
                    include: path.join(__dirname, 'src'),
                },
                {
                    test: /^(?!.*?\.module).*\.s?[ac]ss$/,
                    use: [
                        isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: isProduction,
                                sourceMap: !isProduction,
                            }
                        },
                        {
                            loader: 'sass-loader',
                            sourceMap: !isProduction,
                        }
                    ]
                },
                {
                    test: /\.module\.s?[ac]ss$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                localIdentName: '[name]__[local]--[hash:base64:5]',
                                minimize: isProduction,
                                sourceMap: !isProduction,
                            }
                        },
                        {
                            loader: 'sass-loader',
                            sourceMap: !isProduction,
                        }
                    ]
                }
            ]
        },

        plugins: [
            new CleanWebpackPlugin(['dist']),

            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
            }),

            isDevelopment
                ? new webpack.HotModuleReplacementPlugin()
                : null,

            isDevelopment
                ? null
                : new webpack.BannerPlugin(`${pkg.version} ${new Date().toString()}`),

            new HtmlWebPackPlugin({
                template: path.resolve(__dirname, 'src/index.html'),
                minify: isProduction ? {collapseWhitespace: true, collapseInlineTagWhitespace: true} : false,
                alwaysWriteToDisk: true,
            }),
            new HtmlWebpackHardDiskPlugin(),

            new MiniCssExtractPlugin({
                filename: isDevelopment
                    ? 'assets/styles/[name].css'
                    : 'assets/styles/[name].[hash].css',
            }),

            new CopyWebpackPlugin([
                {
                    context: 'src/assets',
                    from: '**/*',
                    to: 'assets',
                    ignore: ['styles/**/*']
                }
            ]),

            new RobotstxtPlugin({
                policy: [
                    isProduction
                        ? {userAgent: '*', allow: '/'}
                        : {userAgent: '*', disallow: '/'},
                ],
            }),

        ].filter(Boolean),

        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                        enforce: true,
                    },
                }
            }
        },

        devtool: isProduction
            ? 'none'
            : 'source-map',

        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            hot: true,
            port: 9000
        },

    }
};
