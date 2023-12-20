### uu-cli-server

-   介绍
    -   基于 webpack5 的构建工具
    -   支持多入口打包多文件配置

##### uu-cli-server 打包构建工具

-   自定义配置 uu.config.js webpack 写法
    -   webpack 自定义 webpack 配置
    -   vue 设置使用的是 vue 版本
    -   pages 配置多文件查找目录 如: src/page/\*/test
-   .devserverrc.js 开发配置

    -   host, proxy ...

-   多文件配置

    -   uu.config.js 配置文件内配置多文件
        -   pages: 'src/page/\*'
            -   表示 src 目录下每个文件代表一个项目, 必须有 module.json 文件
    -   module.json 在文件夹内新建文件，配置如下 (entry: 打包入口)
        -   title: '',
        -   name: '',
        -   entry: ''
            -   项目入口文件
        -   template
            -   指定 html 模版文件。 默认不用指定

-   依赖
    -   [webpack5](https://www.npmjs.com/package/webpack)
    -   [webpack-dev-server](https://www.npmjs.com/package/webpack-dev-server)
    -   [webpack-chain-5](https://www.npmjs.com/package/webpack-chain-5)
    -   [vue](https://github.com/vuejs)
    -   [babel](https://www.npmjs.com/package/babel-loader)
    -   ...
