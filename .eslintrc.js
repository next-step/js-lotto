module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ['prettier'],
  extends: ['eslint:recommended', 'airbnb-base', 'plugin:prettier/recommended'],
  rules: {
    'import/prefer-default-export': 0,
    'import/extensions': 0,
    'no-alert': 0,
    'class-methods-use-this': 0,
    'no-param-reassign': 0,
  },
};
