module.exports = {
  plugins: ['prettier', 'cypress'],
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: false,
    },
  },
  env: {
    browser: true,
    node: true,
    'cypress/globals': true,
  },
  ignorePatterns: ['node_modules/'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        printWidth: 80, //줄 바꿈 할 폭 길이
        tabWidth: 2, // Tab 넓이
        useTabs: false, // 참일경우 탭이 있는 줄을 들여 쓰기한다.
        semi: true,
        quoteProps: 'as-needed', // 객체의 속성이 인용될때 변경한다. as-needed  or consistent
        jsxSingleQuote: true,
        trailingComma: 'es5', // es5에서의 유효한 쉼표를 추가
        arrowParens: 'always', // arrow function 시 괄호 여부 : always
        endOfLine: 'auto', // if or auto
        bracketSpacing: true, //객체 리터럴에서 괄호에 공백 삽입 여부
        requirePragma: false,
        insertPragma: false,
        vueIndentScriptAndStyle: false,
        bracketSameLine: true, //닫힘 태그 일때 줄넘김 하지 x
      },
    ],
  },
};
