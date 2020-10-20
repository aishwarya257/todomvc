const path = require("path");

const resolve = (...pathList) => path.resolve(...pathList);

const appDirectory = resolve(process.cwd());

module.exports = {
	appEntry: appDirectory,
	rootDir: resolve(appDirectory + "/src"),
	rootFile: resolve(appDirectory + "/src/components/app.tsx"),
	appHTML: resolve(appDirectory + "/public/index.html"),
	outputDir: resolve(appDirectory + "/build"),
	appPublic: resolve(appDirectory + "/public"),
	extensions: [".ts", ".tsx", ".js"],
	nodeModules: resolve(appDirectory + "/node_modules"),
};
