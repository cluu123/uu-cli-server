
const HTML = require('html-webpack-plugin');
const path = require('path');
const fs = require('fs-extra');

module.exports = webpackConfig => {
    webpackConfig.entryPoints.clear();
    const base = process.cwd();
    // eslint-disable-next-line
    const config = require(`${base}/uu.config.js`);
    // const pathArr = [];
    const pathStr = config.pages.replace(/\*+/, '*').split('/*');
    const currentPath = path.join(base, pathStr[0]);
    const files = fs.readdirSync(currentPath);
    files.forEach(ele => {
        let resultHtmlConfig = {};
        const moduleFilePath = path.join(currentPath, ele, './module.json');
        const moduleConfig = fs.readJSONSync(moduleFilePath);
        const htmlPath = moduleConfig.template ? path.resolve(currentPath, ele, moduleConfig.template) : path.resolve(__dirname, './index.html');
        const entry = path.resolve(currentPath, ele, moduleConfig.entry);
        if (fs.existsSync(moduleFilePath)) {
            resultHtmlConfig = {
                name: ele,
                filename: `${ele}.html`,
                template: htmlPath,
                chunks: [ele, 'common'],
                title: ele,
                entry,
                inject: 'body'
            } || {};
        }
        webpackConfig.entry(ele).merge([entry]);
        webpackConfig.plugin(`html-${ele}`).use(HTML, [resultHtmlConfig]);
    });
};
