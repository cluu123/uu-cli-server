const ora = require("ora");
const chalk = require('chalk')
// 定义一个loading
const hash = require('hash-sum')
const URL = require('url')

const webpackMerge = require('webpack-merge');
var aa = {
    name: [1, 2]
};
var bb = {
    name: chalk.bold([1,2,3])
};

console.log(bb);

const url = URL.format({
    protocol: 'http',
    hostname: 'mng.bilibili.co',
    port: chalk.bold( 8080),
    pathname: '/'
})

console.log(url);
console.log(process.platform);

const spinner = ora();
let lastMsg = null;

const logWithSpinner = (symbol, msg) => {
    if (!msg) {
        msg = symbol;
        symbol = chalk.green('✔');
    }
    if (lastMsg) {
        spinner.stopAndPersist({
            symbol: lastMsg.symbol,
            text: lastMsg.text
        });
    }
    spinner.text = ` ${msg}`;
    lastMsg = {
        symbol: `${symbol} `,
        text: msg
    };
    spinner.start();
};
const open = require('open')
open('http://mng.bilibili.co:8088/', { app: undefined }).then(res => {
    
})
// logWithSpinner(`🔍   ${chalk.blue('版本检测...')}`);

const execa = require('execa');
execa('echo', ['123'])
// const result = execa('npm', ['install', 'less'], {
//     cwd: process.cwd(),
//     stdio: ['inherit', 'pipe', 'inherit']
// });
// result.stdout.on('data', (buffer)=>{
//     process.stdout.write(buffer)
// })


