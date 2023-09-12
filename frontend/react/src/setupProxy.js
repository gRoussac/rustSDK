const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  console.log('hello');
  app.use(
    '/rpc',
    createProxyMiddleware({
      target: 'https://rpc.integration.casperlabs.io',
      changeOrigin: true,
    })
  );
};
