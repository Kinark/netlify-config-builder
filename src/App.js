import React from 'react';
import { hot } from 'react-hot-loader/root'
import { Metas } from '~/components/Metas';
import Favicon from '~/components/Favicon';

const title = 'Sample Website';
const description = 'A sample website.';
// const cover = "";

const App = () => (
   <div>
      <Metas title={title} description={description} />
      <Favicon />
      Hey
   </div>
)

export default hot(App)
