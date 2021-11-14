module.exports = {
  plugins: ['prettier'],
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  env: {
    browser: false,
    node: true
  },
  rules: {
    'comma-dangle': ['error', 'never']
  }
};
