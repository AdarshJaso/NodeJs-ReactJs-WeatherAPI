import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import eslintImport from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import validateJsxNesting from 'eslint-plugin-validate-jsx-nesting';
export default [
  {
    ignores: ['node_modules', '.gitignore', 'dist', 'build', 'coverage', 'server/**'],
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
        jsx: true,
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      '@typescript-eslint': typescriptEslint,
      import: eslintImport,
      prettier,
      'validate-jsx-nesting': validateJsxNesting,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
        node: true,
      },
    },
    rules: {
      // ======================
      // Import/Module Rules
      // ======================
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          pathGroups: [
            { pattern: '@/**', group: 'internal' },
            { pattern: '{@/**/*,*}.{css,scss}', group: 'object', position: 'after' },
          ],
          distinctGroup: false,
          'newlines-between': 'never',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],

      // ======================
      // Core JavaScript Rules
      // ======================
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-unused-vars': 'off',

      // ======================
      // TypeScript Rules
      // ======================
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // ======================
      // React Rules
      // ======================
      // React Basic Rules
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-no-undef': 'warn',
      'react/jsx-pascal-case': 'warn',
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/no-this-in-sfc': 'error',

      // React JSX Specific Rules
      'react/jsx-no-useless-fragment': 'warn',
      'react/jsx-key': 'warn',
      'react/jsx-no-duplicate-props': 'warn',
      'react/jsx-curly-brace-presence': ['warn', 'never'],
      'react/jsx-no-comment-textnodes': 'warn',
      'react/jsx-no-bind': ['off', { ignoreRefs: true }],
      'react/jsx-no-literals': 'off',
      'react/jsx-max-depth': ['off', { max: 3 }],

      // React Component Structure
      'react/sort-comp': [
        'warn',
        {
          order: ['static-methods', 'lifecycle', 'everything-else', 'render', 'render-return'],
        },
      ],
      'react/no-unstable-nested-components': ['warn', { allowAsProps: true }],

      // React Deprecations/Warnings
      'react/no-deprecated': 'warn',
      'react/no-danger': 'off',
      'react/no-array-index-key': 'off',
      'react/no-unescaped-entities': 'off',
      'react/no-unknown-property': 'warn',
      'react/jsx-no-constructed-context-values': 'warn',

      // React Props
      'react/require-default-props': 'warn',
      'react/no-unused-prop-types': 'warn',
      'react/no-render-return-value': 'warn',

      // ======================
      // React Hooks Rules
      // ======================
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': ['warn', { additionalHooks: '(useQuery|useMutation)' }],

      // ======================
      // JSX Nesting Validation
      // ======================
      'validate-jsx-nesting/no-invalid-jsx-nesting': 'error',

      // ======================
      // Formatting/Prettier
      // ======================
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],

      // ======================
      // TanStack Query Rules (Commented)
      // ======================
      // '@tanstack/query/exhaustive-deps': 'error',
      // '@tanstack/query/no-rest-destructuring': 'warn',
      // '@tanstack/query/stable-query-client': 'error'
    },
  },
];
