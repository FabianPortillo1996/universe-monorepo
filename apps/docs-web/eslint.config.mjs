import path from 'node:path'

import config from '@repo/eslint-config/react-library'
import storybook from 'eslint-plugin-storybook'

export default [
  ...config,
  ...storybook.configs['flat/recommended'],
  {
    settings: {
      tailwindcss: {
        config: path.join(import.meta.dirname, 'tailwind.css'),
      },
    },
  },
]
