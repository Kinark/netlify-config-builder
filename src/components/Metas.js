import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

export const Cover = ({ children: cover }) => (
   <Helmet>
      <meta property="og:image" content={cover} />
      <meta name="twitter:image" content={cover} />
   </Helmet>
)

Cover.propTypes = {
   children: PropTypes.shape({}).isRequired,
}

export const Description = ({ children: desc }) => (
   <Helmet>
      <meta name="description" content={desc} />
      <meta property="og:description" content={desc} />
      <meta name="twitter:description" content={desc} />
   </Helmet>
)

Description.propTypes = {
   children: PropTypes.string.isRequired
}

export const Title = ({ children: title }) => (
   <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={title} />
      <meta name="twitter:title" content={title} />
      <meta name="apple-mobile-web-app-title" content={title} />
      <meta name="application-name" content={title} />
   </Helmet>
)

Title.propTypes = {
   children: PropTypes.string.isRequired
}

export const Metas = ({ title, description, cover, url, color }) => (
   <Helmet>
      {title && <title>{title}</title>}

      {title && <meta name="description" content={description} />}

      {title && <meta property="og:title" content={title} />}
      {title && <meta property="og:site_name" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {url && <meta property="og:url" content={url} />}
      {cover && <meta property="og:image" content={cover} />}

      <meta name="twitter:card" content="summary" />
      {url && <meta name="twitter:url" content={url} />}
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
      {cover && <meta name="twitter:image" content={cover} />}

      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      {title && <meta name="apple-mobile-web-app-title" content={title} />}
      {title && <meta name="application-name" content={title} />}

      {color && <meta name="msapplication-TileColor" content={color} />}
      {color && <meta name="theme-color" content={color} />}
      {color && <meta name="apple-mobile-web-app-status-bar-style" content={color} />}
   </Helmet>
)

Metas.propTypes = {
   title: PropTypes.string,
   description: PropTypes.string,
   cover: PropTypes.shape({}),
   url: PropTypes.string,
   color: PropTypes.string,
}

Metas.defaultProps = {
   title: '',
   description: '',
   cover: {},
   url: '',
   color: '',
}
