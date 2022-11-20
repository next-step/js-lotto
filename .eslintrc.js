module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
  },
  extends: ["eslint:recommended", "plugin:cypress/recommended"],
};
