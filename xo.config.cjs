const baseConfig = require('@younho9/xo-configs');

/** @type {import('xo').Options & {overrides?: Array<{files: string} & import('xo').Options>}} */
module.exports = {
	...baseConfig,
	prettier: true,
	rules: {
		'no-alert': 'off',
	},
	overrides: [
		{
			files: ['**/cypress/**/*.js'],
			rules: {
				'import/no-unassigned-import': 'off',
				'unicorn/prefer-module': 'off',
				'unicorn/no-empty-file': 'off',
			},
		},
		{
			files: ['**/components/**/*.js'],
			rules: {
				'unicorn/filename-case': [
					'error',
					{
						case: 'pascalCase',
						ignore: ['index.js'],
					},
				],
			},
		},
	],
};
