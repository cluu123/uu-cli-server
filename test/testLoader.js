// function loader(source) {
//     return source;
// }

module.exports = function (source) {
    const opt = this.getOptions();

    // console.log('test-loader');
    // 禁用loader缓存 this.cacheable(false);
    // 异步回调
    this.callback(null, source, opt, 123);
    // return source;
};
