
const WebpackChain = require('webpack-chain-5');
const fs = require('fs-extra');

const configPlugins = [
    '../config/baseConfig.js'
];

const commands = {
    development: './development',
    production: './production'
};

const selectEditionPath = '../lib/selectVue';

module.exports = class Servers {
    constructor(path) {
        this.rootPath = path;
        this.mode = null;
        this.commands = {};
        this.configPulgins = [];
    }

    resolvePath(path) {
        return `${this.rootPath}/${path}`;
    }

    existSyncFile(path) {
        return fs.existsSync(this.resolvePath(path));
    }

    pathExistsSync(path) {
        return fs.pathExistsSync(this.resolvePath(path));
    }

    loadModule(path) {
        // eslint-disable-next-line
        return require(this.resolvePath(path));
    }

    initSelectVue() {
        // eslint-disable-next-line
        const edition = require(selectEditionPath);
        edition(this);
    }

    initConfigPlugins() {
        const chain = new WebpackChain();
        this.configPulgins.forEach(({ fn }) => {
            fn(chain, this);
        });
        return chain.toConfig();
    }

    initCmd() {
        // eslint-disable-next-line
        for (const name in commands) {
            this.commands[name] = {
                name,
                // eslint-disable-next-line
                fn: require(commands[name])
            };
        }
        this.configPulgins = configPlugins.map(path => ({
            // eslint-disable-next-line
            fn: require(path)
        }));
    }

    clearWebpackInfo() {
        const webpackPath = `${this.rootPath}/node_modules/webpack/lib/logging/Logger.js`;
        let content = fs.readFileSync(webpackPath, 'utf8');
        if (/.*LogType.info.*/.test(content)) {
            content = content.replace(/.*LogType.info.*/g, '');
            fs.writeFileSync(webpackPath, content);
        }
    }

    init(mode, argvs) {
        if (argvs.includes('--clear') || argvs.includes('-clear')) {
            this.clearWebpackInfo();
        }
        process.env.NODE_ENV = mode;
        this.mode = mode;
        this.initSelectVue();
        this.initCmd();
        this.commands[mode].fn(this);
    }
};
