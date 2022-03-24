module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "html"],
  rules: {
    // * import 시 확장자명을 입력해도 에러로 판단하지 않는다.
    "import/prefer-default-export": "off",
    "import/extensions": ["off"],
  },
};
