import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import svelte from 'eslint-plugin-svelte';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

const tsRules = {
	...ts.configs.recommended.rules,
	'no-undef': 'off',
	'no-unused-vars': 'off',
	'@typescript-eslint/no-unused-vars': [
		'error',
		{
			argsIgnorePattern: '^_',
			varsIgnorePattern: '^_',
			caughtErrorsIgnorePattern: '^_'
		}
	],
	'@typescript-eslint/no-empty-object-type': 'off',
	'@typescript-eslint/no-unused-expressions': 'off'
};

export default [
	{
		ignores: [
			'site/**',
			'.svelte-kit/**',
			'build/**',
			'package/**',
			'nginx/**',
			'static/**',
			'data/**'
		]
	},
	js.configs.recommended,
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	{
		files: ['**/*.ts', '**/*.js'],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			},
			parser: tsParser,
			parserOptions: {
				sourceType: 'module',
				ecmaVersion: 2020
			}
		},
		plugins: {
			'@typescript-eslint': ts
		},
		rules: {
			...tsRules,
			'svelte/no-navigation-without-resolve': 'off'
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			},
			parserOptions: {
				parser: tsParser
			}
		},
		plugins: {
			'@typescript-eslint': ts
		},
		rules: {
			...tsRules,
			'no-useless-assignment': 'off',
			'svelte/no-at-html-tags': 'off',
			'svelte/require-each-key': 'off',
			'svelte/no-navigation-without-resolve': 'off',
			'svelte/no-reactive-functions': 'off',
			'svelte/no-immutable-reactive-statements': 'off',
			'svelte/no-reactive-reassign': 'off',
			'svelte/infinite-reactive-loop': 'off',
			'svelte/no-useless-mustaches': 'off'
		}
	}
];
