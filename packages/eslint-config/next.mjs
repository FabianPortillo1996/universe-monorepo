import base from './base.mjs'
import next from 'eslint-config-next'
import tailwindcss from 'eslint-plugin-tailwindcss'
import globals from 'globals'

const nextWithoutImport = next.map((config) => {
  if (!config.plugins?.import) return config
  const { import: _, ...plugins } = config.plugins
  return { ...config, plugins }
})

export default [
  ...base,
  ...nextWithoutImport,
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
