import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import nextPlugin from '@next/eslint-plugin-next'
import jsxA11y from 'eslint-plugin-jsx-a11y'

export default defineConfig([
  {
    ignores: ['node_modules', '.next', 'dist'],
  },

  // ⚙️ Para arquivos de configuração como eslint.config.mjs
  {
    files: ['eslint.config.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        process: 'readonly',
        __dirname: 'readonly',
        module: 'readonly',
        require: 'readonly',
      },
    },
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
      },
    },
    plugins: {
      '@next/next': nextPlugin,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'warn',
    },
  },
])
