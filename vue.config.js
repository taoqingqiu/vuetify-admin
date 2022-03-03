const ghPages = process.env.NODE_ENV === "ghPages";

module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    disableHostCheck: true,
    // proxy: {
    //   '/api': {
    //     target: '',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': '',
    //     },
    //   },
    // },
  },
  publicPath: ghPages ? "/vuetify-admin/" : "/", // to cater to github pages
};
