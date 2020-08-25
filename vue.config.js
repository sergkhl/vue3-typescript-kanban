module.exports = {
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
