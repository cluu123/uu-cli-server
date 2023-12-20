const webpack = require('webpack');
const merge = require('webpack-merge');

module.exports = server => {
    const buildFormat = require('../lib/buildFile');
    const customConfig = require('../config/customConfig');

    const {
        logWithSpinner,
        stopSpinner
    } = require('../lib/logger');

    const chainConfig = server.initConfigPlugins();
    const userConfig = server.existSyncFile('uu.config.js') ? server.loadModule('uu.config.js').webpack : {};

    const conformityWebpackConfig = merge.smart(chainConfig, customConfig, userConfig);

    logWithSpinner('打包构建...');
    webpack(conformityWebpackConfig, (err, stats) => {
        stopSpinner();
        console.log(buildFormat(stats));
    });
};
