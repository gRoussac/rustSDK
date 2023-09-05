const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  console.log('hello');
  app.use(
    '/rpc',
    createProxyMiddleware({
      target: 'https://localhost:11101',
      changeOrigin: true,
    })
  );
};
