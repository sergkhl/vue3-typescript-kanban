// https://github.com/GoogleChrome/lighthouse-ci/blob/master/docs/configuration.md

module.exports = {
  ci: {
    collect: {
      // url: ['https://sergkhl.github.io/template-workflows-typescript-vue3/'],
      // startServerCommand: 'rails server -e production',
      numberOfRuns: 1,
      staticDistDir: './dist',
      // staticDistDir: null,
    },
    // assert: {
    //   preset: 'lighthouse:recommended',
    //   // assertions: {
    //   //   'uses-rel-preload': 'off',
    //   //   'uses-rel-preconnect': 'off',
    //   // },
    // },
    upload: {
      target: 'temporary-public-storage',
      //   target: 'lhci',
      //   serverBaseUrl: 'https://your-lhci-server-url.example.com',
      //   token: 'Your *build token* goes here', // could also use LHCI_TOKEN variable instead
    },
  },
}
