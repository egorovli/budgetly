/** biome-ignore-all lint/style/noCommonJs: Babel loads this configuration through CommonJS */

/**
 * @param {import('@babel/core').ConfigAPI} api
 * @returns {import('@babel/core').TransformOptions}
 */
function configure(api) {
	api.cache(true)

	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'react-native-unistyles/plugin',
				{
					root: 'src'
				}
			]
		]
	}
}

module.exports = configure
