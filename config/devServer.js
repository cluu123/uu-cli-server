const chalk = require('chalk');

exports.webpackDevServer4 = {
    host: '127.0.0.1',
    port: 6363,
    // 浏览器报错试试打开
    hot: true,
    // 清除其它信息
    quiet: true,
    // 进度百分比
    progress: true,
    // 压缩
    // compress: false,
    // 是否启用https
    https: false,
    hotOnly: false,
    // clientLogLevel: 'silent',
    // contentBase: '/Users/chenqi/Desktop/pro/niffler/static',
    // watchContentBase: true,
    // hot: true,
    // quiet: true,
    // progress: true,
    // compress: false,
    // overlay: { warnings: false, errors: true },
    // host: '0.0.0.0',
    // port: 8862,
    // https: false,
    // hotOnly: false,
    publicPath: '/',
    contentBasePublicPath: '/'
    // transportMode: { server: 'sockjs', client: 'sockjs' },
    // watchOptions: {}
};

exports.webpackDevServer5 = {
    host: '127.0.0.1',
    port: 6363,
    // 浏览器报错试试打开
    hot: true,
    // 清除其它信息
    // quiet: true,
    // 进度百分比
    // 压缩
    // compress: false,
    // 是否启用https
    client: {
        overlay: false
    },
    https: false
    // hotOnly: false,
    // clientLogLevel: 'silent',
    // contentBase: '/Users/chenqi/Desktop/pro/niffler/static',
    // watchContentBase: true,
    // hot: true,
    // quiet: true,
    // progress: true,
    // compress: false,
    // overlay: { warnings: false, errors: true },
    // host: '0.0.0.0',
    // port: 8862,
    // https: false,
    // hotOnly: false,
    // transportMode: { server: 'sockjs', client: 'sockjs' },
    // watchOptions: {}
};

module.exports = server => {
    const customProxy = require('./proxy');
    if (!server.existSyncFile('.devserverrc.js')) {
        console.log(chalk.red('.devserverrc.js开发配置文件不存在!'));
        process.exit(1);
    }
    const userConfig = server.loadModule('.devserverrc.js');
    const conformityDevConfig = {
        ...exports.webpackDevServer5,
        ...userConfig
    };
    return Object.assign(conformityDevConfig, customProxy);
};
