module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
    "cypress/globals": true
  },
  extends: ['airbnb-base', 'prettier', 'plugin:cypress/recommended'],
  plugins: ['cypress'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
};
