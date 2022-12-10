import httpProxy from "http-proxy";

const proxy = httpProxy.createProxyServer({
  target: "http://127.0.0.1:7001/",
  // changeOrigin: true,
});

const originUrl = "http://localhost:7001";

export default defineEventHandler((event) => {
  return new Promise((resolve) => {
    const options = {};

    const origEnd = event.node.res.end;
    event.node.res.end = function (...args) {
      // console.log("有没有执行");
      resolve(true);
      return origEnd.call(event.node.res, ...args);
    };

    proxy.web(event.node.req, event.node.res, {});
  });
});
