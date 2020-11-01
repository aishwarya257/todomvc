const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const {TsconfigPathsPlugin} = require('tsconfig-paths-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const {rootFile, appBuild, extensions, appHTML, staticJs} = require('./paths.js');

module.exports = (env) => {
    const isEnvProduction = env === 'production';
    return {
        entry: rootFile,
        devtool: isEnvProduction ? false : 'eval-cheap-module-source-map',
        mode: env,
        output: {
            path: appBuild,
            filename: staticJs + (isEnvProduction ? '[name].[contenthash:8].js' : '[name].js'),
            chunkFilename:
                staticJs + (isEnvProduction ? '[name].[contenthash:8].chunk.js' : '[name].chunk.js')
        },
        resolve: {
            extensions,
            plugins: [new TsconfigPathsPlugin()]
        },

        optimization: {
            minimize: isEnvProduction,
            minimizer: [new TerserPlugin()]
        },

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true
                    },
                    exclude: /build/
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: appHTML
            }),
            new ForkTsCheckerWebpackPlugin({
                eslint: {
                    files: './src/**/*.{ts,tsx,js,jsx}' // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
                }
            })
        ]
    };
};
