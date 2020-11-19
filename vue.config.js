module.exports = {
  chainWebpack: (config) => {
    //删除编译后的独立js文件上的预获取操作
    config.plugins.delete("prefetch");
  },
  devServer: {
    // http-proxy 代理跨域
    proxy: {
      "/": {
        target: "https://daiwei.site/netease",
        changeOrigin: true,
      },
    },
  },
};
