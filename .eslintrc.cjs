module.exports = {
	root: true,
	extends: ['@morev/eslint-config/preset/common'],
	rules: {
		'jsdoc/sort-tags': 'off', // @TODO: [2023-05-11] -- "see" should be under description mostly
		'prefer-object-has-own': 'off',
		'@typescript-eslint/no-unnecessary-condition': 'off',
	},
	overrides: [
		{
			files: '.github/**.*',
			rules: {
				'yml/file-extension': 'off',
			},
		},
	],
};
