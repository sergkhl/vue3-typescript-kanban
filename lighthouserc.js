// https://github.com/GoogleChrome/lighthouse-ci/blob/master/docs/configuration.md

module.exports = {
  ci: {
    collect: {
      numberOfRuns: 5,
    },
    assert: {
      preset: 'lighthouse:recommended',
      // assertions: {
      //   'uses-rel-preload': 'off',
      //   'uses-rel-preconnect': 'off',
      // },
    },
    // upload: {
    //   target: 'lhci',
    //   serverBaseUrl: 'https://your-lhci-server-url.example.com',
    //   token: 'Your *build token* goes here', // could also use LHCI_TOKEN variable instead
    // },
  },
}
