module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    "vue/no-unused-components": "off",
    // 强制句末分号
    'semi': [2, 'always'],
    // 单引号
    'quotes': [2, 'single'],
    // 标签关闭需要空格
    'vue/html-closing-bracket-spacing': ['error', {
      'startTag': 'never',
      'endTag': 'never',
      'selfClosingTag': 'always'
    }],
    // 结束标签不要换行
    'vue/html-closing-bracket-newline': ['error', {
      'singleline': 'never',
      'multiline': 'never'
    }],
    // 可以使用v-html
    'vue/no-v-html': 0,
    // 不要mix
    'vue/no-use-v-if-with-v-for': 'error',
    '@typescript-eslint/no-explicit-any': ['off'],
    'space-before-function-paren': ['warn', {
      'anonymous': 'never',
      'named': 'never',
      'asyncArrow': 'always'
    }],
    '@typescript-eslint/explicit-module-boundary-types': 'off'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
