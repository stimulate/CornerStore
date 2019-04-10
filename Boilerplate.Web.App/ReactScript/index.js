// import './stylesheets/style.scss';

import './style/myStyle.css'
import React from 'react'
import { render } from 'react-dom'
import App from './Component/App'
import 'semantic-ui-css/semantic.min.css'
import 'semantic-ui-react'



function renderApp() {
  render(
    <App />,
    document.getElementById('root'),
  )
}
renderApp()

// Allow Hot Module Replacement
if (module.hot) {
  module.hot.accept()
  // module.hot.accept('./routes', () => { const NextApp = require('./routes').default; renderApp(); });
}
