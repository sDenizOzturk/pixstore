// eslint.config.js
import { defineConfig } from 'eslint/config'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import browserGlobals from 'globals'

// merge Node + browser globals if you need both
const globals = { ...browserGlobals.node, ...browserGlobals.browser }

export default defineConfig({
  // skip build output & docs & examples
  ignores: ['tests/**', 'dist/**', 'docusaurus/**', 'examples/**'],

  // only lint your source and test files
  files: ['src/**/*.{ts,js}', 'tests/**/*.{ts,js}'],

  languageOptions: {
    parser: tsParser,
    parserOptions: {
      project: './tsconfig.json', // if you want full type-aware rules
      sourceType: 'module',
      ecmaVersion: 'latest',
    },
    globals,
  },

  plugins: {
    '@typescript-eslint': tsPlugin,
  },

  rules: {
    // pull in all the recommended TS rules
    ...tsPlugin.configs.recommended.rules,
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    // (optionally) tweak any rules here, e.g.:
    // 'no-console': 'warn',
  },
})
