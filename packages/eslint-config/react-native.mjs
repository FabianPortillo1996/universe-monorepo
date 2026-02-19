import base from './base.mjs'
import reactHooks from 'eslint-plugin-react-hooks'
import reactNative from 'eslint-plugin-react-native'
import react from 'eslint-plugin-react';
import globals from "globals";

export default [
    ...base,
    {
        plugins: {
            react,
            'react-hooks': reactHooks,
            'react-native': reactNative,
        },
        rules: {
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            'react-native/no-unused-styles': 'error',
            'react-native/no-inline-styles': 'warn',
            'react-native/no-color-literals': 'off',
        },
    },
    {
        languageOptions: {
            globals: {
                ...globals.builtin
            },
        },
    },
]
