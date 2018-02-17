import React from 'react';
import ReactDOM from 'react-dom';
import App from '~/App';
import { Metas } from '~/components/Metas';
import Favicon from '~/components/Favicon';
// import { BrowserRouter, Route } from 'react-router-dom';

const title = "Sample Website";
const description = "A sample website.";
// const cover = "";

ReactDOM.render(
   <div>
      <Metas title={title} description={description} />
      <Favicon />
      <App />
   </div>
   , document.getElementById('root')
);