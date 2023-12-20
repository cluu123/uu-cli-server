const ora = require('ora');
const chalk = require('chalk');

const spinner = ora();
let lastMsg = null;

const format = (label, msg) => msg.split('\n').map((line, i) => (
    i === 0 ? `${label} ${line}` : line.padStart(chalk.reset(label).length, '')
)).join('\n');

const chalkTag = (msg, bgcolor) => chalk[bgcolor].black.dim(`｢ ${msg} ｣ `);

exports.log = (msg = '', tag = null) => {
    tag ? console.log(format(chalkTag(tag), msg)) : console.log(msg);
};

exports.info = (msg, tag = null) => {
    console.log(format(chalk.bgBlue.black(' INFO ') + (tag ? chalkTag(tag, 'bgBlue') : ''), chalk.blue(msg)));
};

exports.done = (msg, tag = null) => {
    console.log(format(chalk.bgGreen.black(' DONE ') + (tag ? chalkTag(tag, 'bgGreen') : ''), chalk.green(msg)));
};

exports.warn = (msg, tag = null) => {
    console.warn(format(chalk.bgYellow.black(' WARN ') + (tag ? chalkTag(tag, 'bgYellow') : ''), chalk.yellow(msg)));
};

exports.error = (msg, tag = null) => {
    console.error(format(chalk.bgRed(' ERROR ') + (tag ? chalkTag(tag, 'bgRed') : ''), chalk.red(msg)));
};

exports.logWithSpinner = (symbol, msg) => {
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
    console.log(msg);
    spinner.start();
};

exports.stopSpinner = persist => {
    if (persist) {
        spinner.stopAndPersist({
            symbol: lastMsg.symbol,
            text: persist
        });
    }
    else {
        spinner.stop();
    }
    lastMsg = null;
};

exports.pauseSpinner = () => {
    spinner.stop();
};

exports.resumeSpinner = () => {
    spinner.start();
};
