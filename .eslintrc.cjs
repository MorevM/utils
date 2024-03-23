module.exports = {
	root: true,
	extends: [
		'@morev/eslint-config/preset/common',
		'@morev/eslint-config/preset/vitest',
	],
	rules: {},
	overrides: [
		{
			files: ['*.cjs'],
			extends: ['@morev/eslint-config/node'],
		},
	],
};
