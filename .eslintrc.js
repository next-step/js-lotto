module.exports = {
  env: {
    browser: true,
    'cypress/globals': true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: { requireConfigFile: false },
  plugins: ['prettier', 'cypress'],
  extends: ['prettier', 'airbnb-base', 'plugin:prettier/recommended', 'plugin:cypress/recommended'],
  rules: {
    'prettier/prettier': 'error',
    'cypress/no-assigning-return-values': 'error',
    'cypress/no-unnecessary-waiting': 'error',
    'cypress/assertion-before-screenshot': 'warn',
    'cypress/no-force': 'warn',
    'cypress/no-async-tests': 'error',
    'cypress/no-pause': 'error',
    'import/extensions': ['error', 'always'],
    'max-depth': ['error', 2],
    'no-alert': 'off',
  },
};
