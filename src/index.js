import React from 'react';
import ReactDOM from 'react-dom';
import App from '~/App';
import { Metas } from '~/components/Metas';
import '~/components/ExtraColors';
import Favicon from '~/components/Favicon';
import { BrowserRouter, Route } from 'react-router-dom';

// const title = 'The Last Flame';
const description = 'The Last Flame is a indie game development company. We hope to lit your way and make you fall in love with our games :)';
// const cover = "";

ReactDOM.render(
   <React.Fragment>
      <Metas description={description} />
      <Favicon />
      <BrowserRouter>
         <Route component={App} />
      </BrowserRouter>
   </React.Fragment>,
   document.getElementById('root')
);
