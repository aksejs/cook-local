import React from 'react'
import ReactDOM from 'react-dom'

const rootEl = document.getElementById('root') as HTMLDivElement

function render() {
	const App = require('./App').default

	ReactDOM.render(<App />, rootEl)
}

if (module.hot) {
	module.hot.accept('./App', render)
}

render()
