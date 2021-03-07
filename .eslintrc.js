module.exports = {
  env: {
    es6: true,
    browser: true,
    jest: true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    project: './tsconfig.json',
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'no-use-before-define': [0],
    '@typescript-eslint/no-use-before-define': [1],
    'prettier/prettier': 'error',
    'react/jsx-props-no-spreading': 'off',
    'arrow-body-style': [1],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.test.tsx']
      }
    ]
  },
  settings: {
    react: { version: 'detect' }
  }
};
