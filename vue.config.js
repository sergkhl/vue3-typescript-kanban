module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production' ? '/vue3-typescript-kanban/' : '/',
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
