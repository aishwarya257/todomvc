const path = require('path');

const appDirectory = path.resolve(process.cwd());

module.exports = {
    appEntry: appDirectory,
    rootDir: path.resolve(appDirectory + '/src'),
    rootFile: path.resolve(appDirectory + '/src/index.tsx'),
    appHTML: path.resolve(appDirectory + '/public/index.html'),
    outputDir: path.resolve(appDirectory + '/build'),
    appPublic: path.resolve(appDirectory + '/public'),
    extensions: ['.ts', '.tsx', '.js'],
    nodeModules: path.resolve(appDirectory + '/node_modules')
};
