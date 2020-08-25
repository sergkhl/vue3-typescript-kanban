module.exports = {
  root: true,

  env: {
    es6: true,
    worker: true,
    browser: true,
    node: true,
  },

  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
    'prettier/vue',
  ],

  plugins: ['@typescript-eslint', 'vue', 'prettier'],

  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    parser: '@typescript-eslint/parser',
  },

  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      },
    },
  },

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    'prettier/prettier': ['error', { semi: false }],
  },
}
