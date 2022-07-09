module.exports = {
  env: {
    browser: true,
    es2021: true,
    'cypress/globals': true,
  },
  extends: ['airbnb-base', 'prettier', 'plugin:cypress/recommended'],
  plugins: ['prettier', 'cypress'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
  },
};
