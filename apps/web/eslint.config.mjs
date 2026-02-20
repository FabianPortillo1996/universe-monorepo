import path from 'node:path'

import config from '@repo/eslint-config/next'

const eslintConfig = [
  ...config,
  {
    settings: {
      tailwindcss: {
        config: path.join(import.meta.dirname, 'app', 'globals.css'),
      },
    },
  },
]

export default eslintConfig
