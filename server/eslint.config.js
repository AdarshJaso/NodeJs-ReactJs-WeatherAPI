import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import eslintImport from 'eslint-plugin-import';

export default [
  { ignores: ['.gitignore', 'node_modules', 'dist', 'build', 'coverage'] },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.server.json',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      import: eslintImport,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.server.json',
        },
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'no-console': 'warn',
      'no-debugger': 'error',
    },
  },
];
