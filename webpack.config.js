const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const workDir = process.cwd();
module.exports = {
    entry: path.join(workDir, './src/main.js'),
    module: {
        rules: [
            {
                test: /\.(html)$/,
                use: {
                    loader: require.resolve('html-loader'),
                    options: {
                        attr: [':src'],
                        minimize: true
                    }
                }
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: require.resolve('babel-loader'),
                    options: {
                        babelrc: false,
                        presets: [
                            [require.resolve('@babel/preset-env'), {
                                "targets": [
                                    "Android >= 4",
                                    "Chrome >= 20",
                                    "Firefox >= 19",
                                    "Explorer >= 8",
                                    "iOS >= 6",
                                    "Opera >= 12",
                                    "Safari >= 6"
                                ], "corejs": 3
                            }]
                        ],
                        plugins: [require.resolve("@babel/plugin-transform-runtime")]
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(workDir, './')
        }
    }
}