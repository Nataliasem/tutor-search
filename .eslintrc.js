module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', 'prettier'],
  plugins: ['prettier'],
  rules: {
    // [PRETTIER]
    'prettier/prettier': 'warn',

    // [EDITORCONFIG]
    'linebreak-style': ['error', 'unix'],
    'no-trailing-spaces': 'error',
    'eol-last': ['error', 'always'],

    // [ESLINT]
    'quotes': ['error', 'single'],
    'eqeqeq': 'error',
    'radix': 'error',
    'prefer-const': 'warn',
    'no-unneeded-ternary': 'error',
    'camelcase': 'off',
    'curly': ['error', 'all'],
    'no-bitwise': 'error',
    'no-implicit-coercion': 'error',
    'no-template-curly-in-string': 'error',
    'consistent-return': 'error',
    'no-floating-decimal': 'error',
    'no-multi-spaces': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-useless-concat': 'error',
    'yoda': 'error',
    'require-await': 'error',

    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: 'block-like', next: '*' }
    ],

    'vue/order-in-components': 'error',
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['index']
      }
    ],
    'vue/no-invalid-model-keys': 'error',
    'vue/no-multiple-objects-in-class': 'error',
    'vue/no-reserved-component-names': 'error',
    'vue/no-restricted-v-bind': 'error',
    'vue/no-unused-refs': 'warn',
    'vue/require-direct-export': 'error',
    'vue/v-on-event-hyphenation': ['error', 'always'],
    'vue/no-v-html': 'error',
    'vue/no-use-v-if-with-v-for': 'error',
    'vue/no-mutating-props': 'warn',
    'vue/padding-line-between-blocks': ['error', 'always'],
    'vue/component-tags-order': [
      'error',
      {
        order: ['template', 'script', 'style']
      }
    ],
    'vue/no-empty-component-block': 'error',
    'vue/custom-event-name-casing': 'warn',
    'vue/component-definition-name-casing': ['error', 'kebab-case'],
    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case',
      {
        registeredComponentsOnly: true,
        ignores: []
      }
    ],
    'vue/html-comment-content-spacing': 'error',
    'vue/no-boolean-default': ['warn', 'default-false'],
    'vue/no-potential-component-option-typo': ['error', { presets: ['all'] }],
    'vue/no-template-target-blank': 'error',
    'vue/no-unused-properties': [
      'warn',
      {
        groups: ['props', 'data', 'computed', 'methods', 'setup']
      }
    ],
    'vue/no-useless-mustaches': 'error',
    'vue/no-useless-v-bind': 'error',
    'vue/require-name-property': 'error',
    'vue/v-for-delimiter-style': 'error',
    'vue/eqeqeq': 'error',
    'vue/no-irregular-whitespace': 'error',
    'vue/prop-name-casing': 'off',
    'vue/no-constant-condition': 'error',
    'vue/valid-next-tick': 'error',
    'vue/html-button-has-type': [
      'error',
      {
        button: true,
        submit: true,
        reset: false
      }
    ],
    'vue/next-tick-style': ['warn', 'callback'],
    'vue/v-on-function-call': ['error', 'never'],
    'vue/max-attributes-per-line': [
      'warn',
      {
        singleline: 4,
        multiline: 1
      }
    ],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ]
  }
}
