/* eslint-disable class-methods-use-this */
module.exports = class Test {
    constructor() {
        this.a = 1;
    }

    apply(compile) {
        compile.hooks.done.tap('a', () => {
            console.log('test-plugin');
        });
    }
};
