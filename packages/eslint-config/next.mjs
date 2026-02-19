import base from './base.mjs'
import next from 'eslint-config-next'
import tailwindcss from 'eslint-plugin-tailwindcss'
import globals from 'globals'

export default [
  ...base,
  ...next,
  ...tailwindcss.configs['flat/recommended'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.builtin
      },
    },
  },
]
