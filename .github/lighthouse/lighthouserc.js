// https://github.com/GoogleChrome/lighthouse-ci/blob/master/docs/configuration.md

module.exports = {
  ci: {
    collect: {
      numberOfRuns: 1,
      staticDistDir: './dist',
    },
    assert: {
      preset: 'lighthouse:recommended',
      // assertions: {
      //   'uses-rel-preload': 'off',
      //   'uses-rel-preconnect': 'off',
      // },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
