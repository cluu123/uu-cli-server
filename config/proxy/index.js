const proxyCore = require('./proxyCore');

module.exports = {
    setupMiddlewares(middlewares, devServer) {
        proxyCore(middlewares, devServer.app);
        return middlewares;
    }
};
