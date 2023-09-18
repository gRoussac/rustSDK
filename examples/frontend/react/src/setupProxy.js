const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/rpc',
    createProxyMiddleware({
      // target: 'https://rpc.integration.casperlabs.io',
      target: 'http://127.0.0.1:11101',
      changeOrigin: true,
    })
  );
};
