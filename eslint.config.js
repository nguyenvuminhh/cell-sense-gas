import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  // 1. Global ignores must be in their OWN block
  {
    ignores: ['**/node_modules/**', '**/dist/**', 'src/Code.*', '**/*.html', '**/types.ts'],
  },

  // 2. Global JS/TS recommended rules
  eslint.configs.recommended,

  // 3. TS-specific rules
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: false,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      'max-len': ['error', { code: 100 }],
    },
  },
];
