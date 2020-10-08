const rewireStyledComponents = require('react-app-rewire-styled-components')

const CSS_EXP = /\.css$/.toString()
const CSS_MODULES_EXP = /\.module\.css$/.toString()

const rewiredCssModules = config => {
	const rules = config.module.rules.find(rule => rule.oneOf && Array.isArray(rule.oneOf))
	const cssRule = rules.oneOf.findIndex(rule => rule.test.toString() === CSS_EXP)
	const cssModulesRule = rules.oneOf.find(rule => rule.test.toString() === CSS_MODULES_EXP)

	rules.oneOf.splice(cssRule, 1)
	delete cssModulesRule.test

	cssModulesRule.resource = {
		test: /\.css$/,
		or: [/^(?!node_modules)/, /node_modules\/@rocketbank\/andromeda/],
	}

	return config
}

const rewiredPreact = config => {
	config.resolve = {
		...config.resolve,
		alias: {
			...config.resolve.alias,
			// https://github.com/preactjs/preact/issues/1790
			// react: 'preact/compat',
			// 'react-dom/test-utils': 'preact/test-utils',
			// 'react-dom': 'preact/compat',
		},
	}

	return config
}

module.exports = (config, env) => {
	config = rewireStyledComponents(config, env)
	config = rewiredCssModules(config, env)
	config = rewiredPreact(config)

	if (process.env.CI) {
		const { override, useEslintRc } = require('customize-cra')

		return override(useEslintRc())(config, env)
	}

	return config
}
