const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const ClearTerminal = require('clean-terminal-webpack-plugin');
const MiniCss = require('css-minimizer-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const CopyPlugin = require('copy-webpack-plugin');
const Webpackbar = require('webpackbar');
const webpack = require('webpack');
const path = require('path');

const multiPage = require('./multiPage');
const singlePage = require('./singlePage');

module.exports = (webpackConfig, server) => {
    const env = server.mode;
    const configs = server.existSyncFile('uu.config.js') ? server.loadModule('uu.config.js') : {};
    const devtool = env === 'production' ? 'eval' : 'cheap-module-source-map';
    const entryEx = server.existSyncFile('src/main.js');
    const entry = (entryEx || configs.vue === 2) ? server.resolvePath('src/main.js') : server.resolvePath('src/main.ts');
    webpackConfig
        .entry('main')
        .add(entry)
        .end()
        .output
        // .clean(true) // 影响copy-webpack-plugin静态资源?
        .path(server.resolvePath('dist'))
        .filename('js/[name][contenthash:8].js')
        .chunkFilename('js/common/[name][contenthash:8].js')
        // .assetModuleFilename('ss/[hash][ext][query]')
        .publicPath('/');

    webpackConfig
        .stats('errors-only');

    webpackConfig.resolve
        .extensions
        .merge(['.vue', '.ts', '.js', '.json', '.wasm'])
        .end()
        .alias
        .set('@', server.resolvePath('src'));
    // .set('vue$', 'vue/dist/vue.runtime.common.js');

    // 生产环境和开发环境有些打包配置不一样, devtool开启在打包内由eval映射源码
    // 生产环境自动压缩代码
    webpackConfig
        .mode(env)
        .devtool(devtool);

    webpackConfig
        .plugin('vue-template')
        .use(VueLoaderPlugin);
    // webpackConfig
    //     .plugin('html')
    //     .use(Html, [
    //         {
    //             template: 'index.html',
    //             // chunks: [],   多页面配置 数组内容为entry对象的key
    //             inject: 'body'
    //         }
    //     ]);
    webpackConfig
        .plugin('define')
        .use(webpack.DefinePlugin, [
            {
                'process.env': {
                    NODE_ENV: JSON.stringify(env)
                }
            }
        ]);
    webpackConfig
        .when(server.pathExistsSync('static'), webpackConfigBase => {
            webpackConfigBase
                .plugin('copy')
                .use(CopyPlugin, [[{
                    from: server.resolvePath('static'),
                    to: server.resolvePath('dist/static'),
                    toType: 'dir',
                    ignore: ['.DS_Store']
                }]]);
        });
    // 进度条
    webpackConfig
        .plugin('webpackbar')
        .use(Webpackbar, [
            {
                color: '#ff6800',
                // 默认true，启用一个简单的日志报告器
                basic: false,
                profile: false
            }
        ]);
    // 清除终端信息
    // webpackConfig
    //     .plugin('clearTerminal')
    //     .use(ClearTerminal, [
    //         {
    //             onlyInWatchMode: false
    //         }
    //     ]);
    webpackConfig
        .plugin('cssExtract')
        .use(MiniCssExtractPlugin, [
            {
                filename: 'css/[name][contenthash:8].css',
                chunkFilename: 'css/[name][contenthash:8].css'
            }
        ]);

    webpackConfig
        .module
        .rule('vue')
        .test(/\.vue$/)
        // .include
        // .add(process.cwd() + '/src')
        // .end()
        .use('vue-loader')
        .loader('vue-loader');
    webpackConfig
        .module
        .rule('ts')
        .test(/\.([cm]?ts|tsx)$/)
        .exclude
        .add(server.resolvePath('node_modules'))
        .end()
        .use('tsloader')
        .loader('ts-loader')
        .options({
            appendTsSuffixTo: [/\.vue$/]
        });
    webpackConfig
        .module
        .rule('babel')
        .test(/\.js$/)
        .exclude
        .add(server.resolvePath('node_modules'))
        .end()
        .use('babel')
        .loader('babel-loader')
        .options({
            presets: [
                ['@babel/preset-env', { modules: false }]
            ]
        });
    // webpack启动结束打印的信息
    webpackConfig
        .module
        .rule('clearLog')
        .test(/\.js$/)
        .use('clearLog')
        .loader(path.resolve(__dirname, '../lib/clearLog.js'));

    if (env === 'production') {
        webpackConfig
            .module
            .rule('css')
            .test(/\.(css|less)$/)
            .use('mini-css')
            .loader(require('mini-css-extract-plugin').loader);
    }
    else {
        webpackConfig
            .module
            .rule('css')
            .test(/\.(css|less)$/)
            .use('vue')
            .loader('vue-style-loader');
    }
    // console.log(path.resolve(__dirname, '../test/testLoader'));
    webpackConfig
        .module
        .rule('css')
        .test(/\.(css|less)$/)
        .use('css-loader')
        .loader('css-loader')
        .end()
        .use('less')
        .loader('less-loader')
        .end();

    webpackConfig
        .module
        .rule('font')
        .test(/\.(woff|woff2|eot|ttf|otf)$/i)
        .type('asset/resource')
        .generator({
            filename: 'font/[hash][ext][query]'
        })
        .end();
    webpackConfig
        .module
        .rule('media')
        .test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)$/)
        .type('asset/resource')
        .generator({
            filename: 'media/[hash][ext][query]'
        })
        .end();

    webpackConfig
        .resolveLoader
        .modules
        .add(server.resolvePath('node_modules'));

    webpackConfig.merge({
        optimization: {
            minimize: true,
            minimizer: {
                MiniCss: {
                    plugin: new MiniCss()
                }
            }
        },
        watchOptions: {
            ignored: /node_modules/
        }
    });

    webpackConfig
        .optimization
        .splitChunks({
            cacheGroups: {
                vendors: {
                    name: 'common',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    chunks: 'initial'
                },
                cssChunks: {
                    chunks: 'all',
                    name: 'css',
                    test: /\.(css|less)$/,
                    minChunks: 1,
                    minSize: 50000,
                    maxSize: 10000,
                    maxAsyncRequests: 10,
                    maxInitialRequests: 10,
                    priority: -20
                }
            }
        });
    configs.pages ? multiPage(webpackConfig, server) : singlePage(webpackConfig, server);
};
