const trbl = (name, suffix = '') => {
	const props = [name, `${name}-top`, `${name}-right`, `${name}-bottom`, `${name}-left`]

	if (suffix.length === 0) {
		return props
	}

	return props.map(prop => `${prop}-${suffix}`)
}

const minMax = suffix => [suffix, `min-${suffix}`, `max-${suffix}`]

module.exports = {
	processors: ['stylelint-processor-styled-components'],
	extends: [
		'stylelint-config-recommended',
		'stylelint-config-prettier',
		'stylelint-config-styled-components',
		'stylelint-prettier/recommended',
	],
	plugins: ['stylelint-order', 'stylelint-prettier'],
	rules: {
		'declaration-block-no-duplicate-properties': true,
		'order/order': [['custom-properties'], { unspecified: 'bottom' }],
		'order/properties-order': [
			[
				{
					emptyLineBefore: 'always',
					properties: ['all', 'composes'],
				},
				{
					emptyLineBefore: 'always',
					properties: ['position', 'z-index', 'top', 'right', 'bottom', 'left'],
				},
				{
					emptyLineBefore: 'always',
					properties: [
						'display',
						'overflow',
						'overflow-x',
						'overflow-y',
						'box-sizing',
						...trbl('margin'),
						...trbl('border'),
						...trbl('border', 'width'),
						...trbl('border', 'style'),
						...trbl('border', 'color'),
						...trbl('padding'),
						...minMax('width'),
						...minMax('height'),
						'flex',
						'flex-basis',
						'flex-direction',
						'flex-flow',
						'flex-grow',
						'flex-shrink',
						'flex-wrap',
						'align-content',
						'align-items',
						'align-self',
						'justify-content',
						'order',
					],
				},
			],
			{
				unspecified: 'bottomAlphabetical',
			},
		],
	},
}
