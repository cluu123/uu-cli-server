const http = require('http-proxy');
const fs = require('fs');
const chalk = require('chalk');
const { done } = require('../../lib/logger');

let proxyMap = [];

const defaultConfig = {
    secure: false,
    changeOrigin: true,
    ws: true,
    xfwd: true
};

const onProxyReqLog = target => (proxyReq, req) => {
    console.log(chalk.bgHex('#ffb500').hex('#000')('INFO ｢ Proxy Server ｣ '));
    console.log(chalk.yellow(`  😲  ${chalk.cyan(`${req.method}:`)} ${
        chalk.cyan(req.url)
    } ==> ${chalk.cyan(target)}.`));
    console.log();
};

const onProxyErrorLog = target => (err, req) => {
    console.log(chalk.red(`Proxy失败：(${err.code})`), ' Proxy  Serve');
    console.log(chalk.yellow(`  🙁  ${chalk.cyan(`${req.method}:`)} ${
        chalk.cyan(req.url)
    } ==> ${chalk.cyan(target)}.`));
    console.log();
};

const formatProxy = (proxy, mes) => {
    if (!proxy) {
        return;
    }
    proxyMap = Object.keys(proxy).map(ele => {
        const config = proxy[ele];
        const {
            target, bypass, onProxyReq, onError
        } = config;
        const byPassLog = onProxyReqLog(target);
        const reqLog = onProxyReqLog(target);
        const errLog = onProxyErrorLog(target);
        return {
            ...defaultConfig,
            ...config,
            name: ele,
            byPass(proxyReq, req, res) {
                byPassLog(proxyReq, req, res);
                bypass && bypass(proxyReq, req, res);
            },
            onProxyReq(proxyReq, req, res) {
                reqLog(proxyReq, req, res);
                onProxyReq && onProxyReq(proxyReq, req, res);
            },
            onError(err, req, res) {
                errLog(err, req, res);
                onError && onError(err, req, res);
                const host = req.headers && req.headers.host;
                res.end(
                    `Proxy error: Could not proxy request ${req.url} from ${host} to ${target} (${err.code}).`
                );
            }
        };
    });
    done(mes);
    console.log();
};

module.exports = (middlewares, app) => {
    console.clear();
    const path = `${process.cwd()}/.devserverrc.js`;
    // logWithSpinner(`🌏   ${chalk.blue('装载Proxy Serve...')}`);
    // eslint-disable-next-line import/no-dynamic-require
    formatProxy(require(path).proxy, `${chalk.blue('装载Proxy Serve完成')}`);
    fs.watch(path, () => {
        delete require.cache[require.resolve(path)];
        // eslint-disable-next-line import/no-dynamic-require
        const config = require(path);
        // logWithSpinner(`🎄   ${chalk.hex('#ff9a00')('Proxy Serve热重载...')}`);
        // // eslint-disable-next-line import/no-dynamic-require
        formatProxy(config.proxy, `${chalk.hex('#ff9a00')('Proxy Serve热重载完成')}`);
    });
    app.use((request, response, next) => {
        const configItem = proxyMap.find(ele => request.path.includes(ele.name));
        if (configItem) {
            const proxyController = http.createProxyServer({});
            const {
                byPass, onProxyReq, onError, ...proxyConfig
            } = configItem;
            proxyController.web(request, response, proxyConfig);
            proxyController.on('proxyReq', onProxyReq);
            // proxyController.on('proxyReq', byPass);
            proxyController.on('error', onError);
        }
        else {
            next();
        }
    });
};
