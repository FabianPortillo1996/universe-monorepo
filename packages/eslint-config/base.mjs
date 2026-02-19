import js from '@eslint/js'
import unicorn from 'eslint-plugin-unicorn'
import tseslint from 'typescript-eslint'
import security from 'eslint-plugin-security'
import globals from "globals";
import sonarjs from 'eslint-plugin-sonarjs';
import importPlugin from "eslint-plugin-import";

export default [

  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/storybook-static/**',
      '**/.next/**',
      '**/android/**',
      '**/ios/**'
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  sonarjs.configs.recommended,

  {
    plugins: {
      security,
      unicorn,
      import: importPlugin
    },
    rules: {
      "import/no-unresolved": "error",
      "import/named": "error",
      "import/default": "error",
      "import/namespace": "error",

      'security/detect-object-injection': 'warn',
      'security/detect-non-literal-fs-filename': 'error',
      'security/detect-unsafe-regex': 'error',
      'security/detect-eval-with-expression': 'error',

      'unicorn/filename-case': ['error', { case: 'kebabCase' }],
      'unicorn/no-array-for-each': 'warn',
      'unicorn/prefer-node-protocol': 'error',
      'unicorn/prefer-query-selector': 'error',

      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },
      react: { version: 'detect' },
    },
  },

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      sourceType: 'module',
      globals: globals.builtin,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
      },
    },
  },
]
