module.exports = {
	root: true,
	extends: ['@morev/eslint-config/preset/common'],
	rules: {
		'jsdoc/sort-tags': 'off', // @TODO: [2023-05-11] -- "see" should be under description mostly
		// No need with TS
		'jsdoc/require-param-type': 'off',
		'jsdoc/require-returns-type': 'off',

		'prefer-object-has-own': 'off',
	},
};
