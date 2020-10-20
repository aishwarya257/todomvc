const WebpackDevServer = require("webpack-dev-server");
const Webpack = require("webpack");
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = "0.0.0.0";
const webpackConfig = require("../config/webpack.config.js");
const { appPublic } = require("../config/paths.js");
const compiler = Webpack(webpackConfig);
const devServerOptions = Object.assign(
	{},
	{
		contentBase: appPublic,
		watchContentBase: true,
		hot: true,
		open: true,
		publicPath: "/",
		historyApiFallback: true,
	}
);

const server = new WebpackDevServer(compiler, devServerOptions);

server.listen(DEFAULT_PORT, HOST, (err) => {
	if (err) {
		return console.log(err);
	}
	console.log("Starting development server");
});
