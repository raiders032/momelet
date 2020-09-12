// https://github.com/expo/expo/tree/master/packages/eslint-config-universe
// https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb

module.exports = {
  extends: 'universe/native',
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    // "indent": ["warn", 2],
    // "max-len": ["error", { "code": 80 }],
    'padding-line-between-statements': [
      'warn',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
    ],
    '@typescript-eslint/no-unused-vars': 'off',
  },
};
