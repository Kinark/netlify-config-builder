import { hot } from 'react-hot-loader/root'
import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'

import { Metas } from '~/components/Metas';
import Favicon from '~/components/Favicon';
import AppRoutes from '~/components/AppRoutes';

const App = () => (
   <BrowserRouter>
      <Metas title="Sample Website" description="" />
      <Favicon />
      <AppRoutes />
      <GlobalStyle />
   </BrowserRouter>
)

export default hot(App)

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #F6F7FB;
    color: #1A213A;
    font-family: 'Lato', sans-serif;
    line-height: normal;
  }
`
