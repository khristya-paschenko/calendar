module.exports = {
    root: true,
    languageOptions: {
        parser: '@typescript-eslint/parser',
        parserOptions: {
            ecmaVersion: 12,
            sourceType: 'module',
        },
        globals: {

        },
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
        'prettier/prettier': 'error',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                argsIgnorePattern: '^_',
            },
        ],
    },
    ignores: ['node_modules/', '.expo/'],
};
