import React from 'react';
import { render } from 'react-dom';
import App from '~/App';
import { BrowserRouter, Route } from 'react-router-dom';

const root = document.getElementById('root')

render(<BrowserRouter><Route component={App} /></BrowserRouter>, root);

if (module.hot) {
   module.hot.accept()
   console.clear()
}
