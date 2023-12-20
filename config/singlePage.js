const HTML = require('html-webpack-plugin');
const fs = require('fs-extra');
const path = require('path');

module.exports = webpackConfig => {
    let htmlTemplate = path.resolve(__dirname, './index.html');
    const htmlPath = `${process.cwd()}/index.html`;
    if (fs.existsSync(htmlPath)) {
        htmlTemplate = htmlPath;
    }
    webpackConfig
        .plugin('html')
        .use(HTML, [
            {
                template: htmlTemplate,
                inject: 'body'
            }
        ]);
};
