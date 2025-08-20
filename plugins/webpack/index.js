const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function () {
  return {
    name: "custom-proxy-plugin",
    configureDevServer(app) {
      app.use(
        "/api/projects",
        createProxyMiddleware({
          target: "http://10.15.20.69:3000",
          changeOrigin: true,
          secure: false,
          logLevel: "debug",
        })
      );
    },
  };
};
