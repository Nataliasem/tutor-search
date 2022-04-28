module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    // [VUE]
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['index']
      }
    ],
    'vue/no-invalid-model-keys': 'error', // Секция model без опечаток
    'vue/no-multiple-objects-in-class': 'error', // Несколько объектов в биндингах не нужны
    'vue/no-reserved-component-names': 'error', // Не именовать компоненты зарезервированными именами
    'vue/no-restricted-v-bind': 'error', // Проверка корректных v-bind
    'vue/no-unused-refs': 'warn', // Проверка на неиспользуемые refs
    'vue/require-direct-export': 'error', // Проверка, что компонент экспортируется напрямую
    'vue/v-on-event-hyphenation': ['error', 'always'], // Проверка кейса событий
    'vue/no-v-html': 'error', // Вместо них используем v-safe-html / v-markdown
    'vue/no-use-v-if-with-v-for': 'error', // Не использовать v-for + v-if одновременно на теге
    'vue/no-mutating-props': 'warn', // Не мутировать входные параметры
    'vue/padding-line-between-blocks': ['error', 'always'], // Пустая строка между секциями
    'vue/component-tags-order': [
      'error',
      {
        order: ['template', 'script', 'style'] // Порядок секций в компонентах
      }
    ],
    'vue/no-empty-component-block': 'error', // Не оставляем пустые секции
    'vue/custom-event-name-casing': 'warn', // Именование событий без camelCase
    'vue/component-definition-name-casing': ['error', 'kebab-case'], // Имена компонентов в kebab-case
    'vue/component-name-in-template-casing': [
      // Имена компонентов в шаблоне в kebab-case
      'error',
      'kebab-case',
      {
        registeredComponentsOnly: true,
        ignores: []
      }
    ],
    'vue/html-comment-content-spacing': 'error', // Пробелы в комментариях
    'vue/no-boolean-default': ['warn', 'default-false'], // default: false в булевых входных параметров
    'vue/no-potential-component-option-typo': ['error', { presets: ['all'] }], // Возможные опечатки в названиях секций компонентов
    'vue/no-template-target-blank': 'error', // Все ссылки с target="_blank"
    'vue/no-unused-properties': [
      'warn',
      {
        groups: ['props', 'data', 'computed', 'methods', 'setup']
      }
    ], // Проверка неиспользуемых свойств
    'vue/no-useless-mustaches': 'error', // Лишнее использование интерполяции для вставки текста
    'vue/no-useless-v-bind': 'error', // Лишний биндинг для строк
    'vue/require-name-property': 'error', // У компонентов должна быть опция name
    'vue/v-for-delimiter-style': 'error', // Единый стиль разделителя для v-for
    'vue/eqeqeq': 'error', // Использование только строгих сравнений
    'vue/no-irregular-whitespace': 'error', // Проверка на нестандартные отступы
    'vue/prop-name-casing': 'off', // Отключаем проверку camelCase входных параметров
    'vue/no-constant-condition': 'error', // Постоянные условия в шаблоне
    'vue/valid-next-tick': 'error',
    // У кнопок должен быть указан type
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

    // [VUE] Максимум атрибутов в строке
    // WARN, потому что в некоторых случаях ESLINT/PRETTIER конфликтуют
    // REF: https://github.com/prettier/prettier/issues/5501
    'vue/max-attributes-per-line': [
      'warn',
      {
        singleline: 4,
        multiline: 1
      }
    ],

    // [VUE] Авто-закрытие тегов
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
    ],

    // [VUE] Порядок опций в компонентах
    'vue/order-in-components': 'error'
  }
}
