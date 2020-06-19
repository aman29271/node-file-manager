module.exports = {
	env: {
		commonjs: true,
		es6: true,
		node: true,
	},
	extends: ['eslint:recommended', 'prettier'],
	plugins: ['prettier'],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaVersion: 11,
	},
	overrides: [
		{
			files: 'lib/templates/*.jsx',
			plugins: ['react'],
			env: {
				browser: true,
			},
		},
		{
			files: 'public/js/*.js',
			env: { browser: true },
		},
	],
	rules: {
		'prettier/prettier': 'error',
		// indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		// semi: ['error', 'never'],
	},
};
