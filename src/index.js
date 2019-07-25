import React from 'react'
import { render } from 'react-dom'
import App from '~/App'
import './styles.global.scss'

const root = document.getElementById('root')

render(<App />, root)

if (module.hot) {
   module.hot.accept('./App.js', () => {
      // eslint-disable-next-line global-require
      const NextApp = require('./App.js').default
      render(<NextApp />, root)
   })
}
