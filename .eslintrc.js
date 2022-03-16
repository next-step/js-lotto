module.exports = {
  env: {
    browser: true,
    'cypress/globals': true,
  },
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
    'max-depth': ['error', 2],
  },
};
