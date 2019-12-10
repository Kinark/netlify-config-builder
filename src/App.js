import { hot } from 'react-hot-loader/root'
import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import ReactGA from 'react-ga'

import { Metas } from '~/components/Metas'
import Favicon from '~/components/Favicon'
import AppRoutes from '~/components/AppRoutes'

ReactGA.initialize('UA-128647381-4')
ReactGA.pageview(window.location.pathname + window.location.search)

const App = () => (
   <BrowserRouter>
      <Metas title="Netlify Config Builder" description="Stop messing around with YML" />
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
    overflow-y: scroll;
    font-size: 1.4rem;
  }
`
