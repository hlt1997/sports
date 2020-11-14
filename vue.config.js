module.exports = {
  devServer: {
    proxy: {
      "/": {
        target: "https://daiwei.site/netease",
        changeOrigin: true,
      },
    },
  },
};
