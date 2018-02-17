import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from "react-helmet";

import appleTouchIcon57 from "./images/apple-touch-icon-57x57.png";
import appleTouchIcon72 from "./images/apple-touch-icon-72x72.png";
import appleTouchIcon114 from "./images/apple-touch-icon-114x114.png";
import appleTouchIcon120 from "./images/apple-touch-icon-120x120.png";
import appleTouchIcon144 from "./images/apple-touch-icon-144x144.png";
import appleTouchIcon152 from "./images/apple-touch-icon-152x152.png";
import favicon16 from "./images/favicon-16x16.png";
import favicon32 from "./images/favicon-32x32.png";
import mstile144 from "./images/mstile-144x144.png";
import favicon from "./images/favicon.ico";

const Favicon = (props) => {
   return (
      <Helmet>
         <link rel="apple-touch-icon-precomposed" sizes="57x57" href={appleTouchIcon57} />
         <link rel="apple-touch-icon-precomposed" sizes="72x72" href={appleTouchIcon72} />
         <link rel="apple-touch-icon-precomposed" sizes="114x114" href={appleTouchIcon114} />
         <link rel="apple-touch-icon-precomposed" sizes="120x120" href={appleTouchIcon120} />
         <link rel="apple-touch-icon-precomposed" sizes="144x144" href={appleTouchIcon120} />
         <link rel="apple-touch-icon-precomposed" sizes="152x152" href={appleTouchIcon152} />
         <link rel="icon" sizes="32x32" type="image/png" href={favicon16} />
         <link rel="icon" sizes="16x16" type="image/png" href={favicon32} />
         <meta name="msapplication-TileImage" content={mstile144} />
      </Helmet>
   )
}

export default Favicon;