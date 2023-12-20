#! /usr/bin/env node
const figlet = require('figlet');

module.exports = () => {
    console.log(
        '\r\n' +
            figlet.textSync('bilibili', {
                font: 'Standard',
                horizontalLayout: 'default',
                verticalLayout: 'default',
                width: 200,
                whitespaceBreak: true,
            })
    );
}