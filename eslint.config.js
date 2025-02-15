import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  eslintConfigPrettier,
  eslintPluginPrettier,
  {
    files: ['**/*.js', '**/*.test.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      eqeqeq: ['error'],
      'no-unused-vars': ['error'],
      'no-else-return': 'error',
      'max-params': ['error', 2],
      'max-depth': ['error', 1],
    },
  },
];
