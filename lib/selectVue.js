const execa = require('execa');
const fs = require('fs-extra');
const chalk = require('chalk');

module.exports = server => {
    // const entryEx = server.existSyncFile('src/main.js');
    const configs = server.existSyncFile('uu.config.js') ? server.loadModule('uu.config.js') : {};
    const vueLoaderPack = fs.readFileSync(`${process.cwd()}/node_modules/vue-loader/package.json`, 'utf8');

    const pack = fs.readFileSync(`${process.cwd()}/package.json`, 'utf8');
    const parsePack = JSON.parse(pack).dependencies;
    const vue = parsePack.vue.replace(/\^/g, '').split('.')[0];
    const vueLoader = JSON.parse(vueLoaderPack).version;
    const vueRouter = parsePack['vue-router'].replace(/\^/g, '').split('.')[0];

    let command = 'npm';

    try {
        execa.sync('yarn', ['--version']);
        command = 'yarn';
    }
    catch (err) {
        console.log(err);
    }
    if (configs.vue && configs.vue === 2 && (vue >= 3 || vueLoader >= 17 || vueRouter >= 4)) {
        console.log(chalk.green('正在更新中...'), 1);
        // execa.sync('npm', ['uninstall', 'vue', '--force']);
        execa.sync(command, [command === 'yarn' ? 'add' : 'i', 'vue@2.7.14', 'vue-loader@15.10.1', 'vue-router@3.5.1', '--legacy-peer-deps']);
        return;
    }
    if (configs.vue && configs.vue === 3 && (vue < 3 || vueLoader < 17 || vueRouter < 4)) {
        console.log(chalk.green('正在更新中...'), 2);
        // execa.sync('npm', ['uninstall', 'vue', '--force']);
        execa.sync(command, [command === 'yarn' ? 'add' : 'i', 'vue@latest', 'vue-loader@latest', 'vue-router@latest', '--legacy-peer-deps']);
        return;
    }
    if (configs.pages) {
        console.log(5);
        // return;
    }
    // if (!configs.vue && entryEx && (vue >= 3 || vueLoader >= 17 || vueRouter >= 4)) {
    //     console.log(chalk.green('正在更新中...'), 3);
    //     // execa.sync('npm', ['uninstall', 'vue', '--force']);
    //     execa.sync(command, [command === 'yarn' ? 'add' : 'i', 'vue@2.7.14', 'vue-loader@15.10.1', 'vue-router@3.5.1', '--legacy-peer-deps']);
    //     return;
    // }
    // if (!configs.vue && !entryEx && (vue < 3 || vueLoader < 17 || vueRouter < 4)) {
    //     console.log(chalk.green('正在更新中...'), 4);
    //     // execa.sync('npm', ['uninstall', 'vue', '--force']);
    //     execa.sync(command, [command === 'yarn' ? 'add' : 'i', 'vue@latest', 'vue-loader@latest', 'vue-router@latest', '--legacy-peer-deps']);
    // }
};
