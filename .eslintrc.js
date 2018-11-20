const path = require('path');

module.exports = {
   parser: 'babel-eslint',
   parserOptions: {
      sourceType: 'module',
      allowImportExportEverywhere: true
   },
   'extends': 'airbnb',
   env: {
      browser: true,
      node: true
   },
   rules: {
      'no-plusplus': 'off',
      'class-methods-use-this': [0, { exceptMethods: ['getDataFromRpc'] }],
      'max-len': 0,
      'object-curly-newline': 0,
      'semi': 0,
      'linebreak-style': 0,
      allowThen: 'true',
      indent: 'off',
      'arrow-parens': [
         'off'
      ],
      'compat/compat': 'off',
      'consistent-return': 'off',
      'comma-dangle': 'off',
      'generator-star-spacing': 'off',
      'import/no-named-as-default': 'off',
      'import/no-extraneous-dependencies': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      'no-console': 'off',
      'no-use-before-define': 'off',
      'no-multi-assign': 'off',
      'promise/param-names': 'error',
      'promise/always-return': 'error',
      'promise/catch-or-return': 'error',
      'promise/no-native': 'off',
      'react/no-unescaped-entities': 0,
      'react/jsx-indent-props': 'off',
      'react/jsx-one-expression-per-line': 'off',
      'react/jsx-indent': 'off',
      'react/sort-comp': [
         'error',
         {
            order: [
               'type-annotations',
               'static-methods',
               'lifecycle',
               'everything-else',
               'render'
            ]
         }
      ],
      'react/jsx-no-bind': 'off',
      'react/jsx-filename-extension': [
         'error',
         {
            extensions: [
               '.js',
               '.jsx'
            ]
         }
      ],
      'react/prefer-stateless-function': 'off'
   },
   plugins: [
      'flowtype',
      'import',
      'promise',
      'compat',
      'react'
   ],
   settings: {
      'import/resolver': {
         webpack: { config: path.resolve('./config/webpack.common.js'), },
      }
   }
}
