const chalk = require('chalk');
const webpack = require('webpack');
const merge = require('webpack-merge');
const WebpackDevServer = require('webpack-dev-server');

module.exports = server => {
    const { iPAdress } = require('../lib/ipAddress');
    const customConfig = require('../config/customConfig');

    const chainConfig = server.initConfigPlugins();
    const userConfig = server.existSyncFile('uu.config.js') ? server.loadModule('uu.config.js').webpack : {};

    const conformityWebpackConfig = merge.smart(chainConfig, customConfig, userConfig);
    const devServer = require('../config/devServer');

    const compile = webpack(conformityWebpackConfig);
    const devServerOptions = devServer(server);

    if (!devServerOptions.server) {
        devServerOptions.server = devServerOptions.https ? 'https' : 'http';
    }

    const webpackServer = new WebpackDevServer(devServerOptions, compile);

    ['SIGINT', 'SIGTERM'].forEach(signal => {
        process.on(signal, () => {
            webpackServer.stopCallback(() => {
                process.exit(0);
            });
        });
    });

    let count = 0;

    compile.hooks.done.tap('done', () => {
        const protocol = devServerOptions.server.type;
        if (count) {
            console.clear();
            console.log(chalk.bgRed('Done!'), chalk.hex('#4affde')('服务重载成功... '));
            console.log();
            console.log(chalk.hex('#d2a500')('  - Local:  '), chalk.hex('#a200b7').bold(`${protocol}://${devServerOptions.host}:${devServerOptions.port}`));
            console.log(chalk.hex('#d2a500')('  - Network:'), chalk.hex('#a200b7').bold(`${protocol}://${iPAdress}:${devServerOptions.port}`));
            console.log();
            return;
        }
        console.clear();
        console.log(chalk.bgRed('Done!'), chalk.red.bold('server is running... '));
        console.log();
        console.log(chalk.hex('#d2a500')('  - Local:   '), chalk.hex('#a200b7').bold(`${protocol}://${devServerOptions.host}:${devServerOptions.port}`));
        console.log(chalk.hex('#d2a500')('  - Network: '), chalk.hex('#a200b7').bold(`${protocol}://${iPAdress}:${devServerOptions.port}`));
        console.log();
        count--;
    });

    webpackServer.start();
    // open('http://mng.bilibili.co/', { app: undefined }).catch(() => { })
};
