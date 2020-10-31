process.env.NODE_ENV = 'production';

const fs = require('fs-extra');

const webpack = require('webpack');

const webpackConfig = require('../config/webpack.config');
const paths = require('../config/paths');

const config = webpackConfig('production');

function copyPublicFolder() {
    fs.copySync(paths.appPublic, paths.appBuild, {
        dereference: true,
        filter: (file) => file !== paths.appHtml
    });
}

fs.emptyDirSync(paths.appBuild);
copyPublicFolder();
const compiler = webpack(config);

compiler.run((err, stats) => {
    console.log(err, stats);
});
