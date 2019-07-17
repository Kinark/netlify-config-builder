import { hot } from 'react-hot-loader/root'
import React from 'react';
import { BrowserRouter } from 'react-router-dom'

import { Metas } from '~/components/Metas';
import Favicon from '~/components/Favicon';
import AppRoutes from '~/components/AppRoutes';

const App = () => (
   <BrowserRouter>
      <Metas title="Sample Website" description="" />
      <Favicon />
      <AppRoutes />
   </BrowserRouter>
)

export default hot(App)
