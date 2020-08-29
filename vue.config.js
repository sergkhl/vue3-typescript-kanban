module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production'
      ? '/template-workflows-typescript-vue3/'
      : '/',
  devServer: {
    https: true,
  },
  css: {
    loaderOptions: {
      postcss: {
        config: {
          path: './postcss.config.js',
        },
      },
    },
  },
}
