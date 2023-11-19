module.exports = {
	globDirectory: './',
	globPatterns: [
		'**/*.{html,css,ico,jpg,svg,png,js}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};