const ghPages = process.env.VUE_APP_ENV === 'gh-pages';

module.exports = {
  transpileDependencies: ['vuetify'],
  devServer: {
    disableHostCheck: true,
  },
  publicPath: ghPages ? '/vuetify-admin/' : '/', // to cater to github pages
};
