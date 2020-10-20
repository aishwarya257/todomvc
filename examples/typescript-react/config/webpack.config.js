const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");
const { rootFile, outputDir, extensions, appHTML } = require("./paths.js");
module.exports = {
	entry: rootFile,
	mode: "development",
	output: {
		path: outputDir,
		filename: "[name].js",
	},
	resolve: {
		extensions,
		plugins: [new TsconfigPathsPlugin()],
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
				options: {
					transpileOnly: true,
				},
				exclude: /build/,
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: appHTML,
		}),
		new ForkTsCheckerWebpackPlugin({}),
	],
};
