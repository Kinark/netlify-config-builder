import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from "react-helmet";

export const Cover = (props) => {
   return (
      <Helmet>
         <meta property="og:image" content={props.content} />
         <meta name="twitter:image" content={props.content} />
      </Helmet>
   )
}

Cover.propTypes = {
   content: PropTypes.object.isRequired
}

export const Description = (props) => {
   return (
      <Helmet>
         <meta name="description" content={props.content} />
         <meta property="og:description" content={props.content} />
         <meta name="twitter:description" content={props.content} />
      </Helmet>
   )
}

Description.propTypes = {
   content: PropTypes.string.isRequired
}

export const Title = (props) => {
   return (
      <Helmet>
         <meta property="og:title" content={props.content} />
         <meta property="og:site_name" content={props.content} />
         <meta name="twitter:title" content={props.content} />
         <meta name="apple-mobile-web-app-title" content={props.content} />
         <meta name="application-name" content={props.content} />
      </Helmet>
   )
}

Title.propTypes = {
   content: PropTypes.string.isRequired
}

export const Metas = (props) => {
   const title = props.title ? props.title : '';
   const description = props.description ? props.description : '';
   const cover = props.cover ? props.cover : '';
   const url = props.url ? props.url : '';
   const color = props.color ? props.color : '';
   return (
      <Helmet>
         <title>{title}</title>
         
         <meta name="description" content={description} />
   
         <meta property="og:title" content={title} />
         <meta property="og:site_name" content={title} />
         <meta property="og:description" content={description} />
         <meta property="og:url" content={url} />
         <meta property="og:image" content={cover} />
   
         <meta name="twitter:card" content="summary" />
         <meta name="twitter:url" content={url} />
         <meta name="twitter:title" content={title} />
         <meta name="twitter:description" content={description} />
         <meta name="twitter:image" content={cover} />
   
         <meta name="mobile-web-app-capable" content="yes" />
         <meta name="apple-mobile-web-app-capable" content="yes" />
         <meta name="apple-mobile-web-app-title" content={title} />
         <meta name="application-name" content={title} />
         
         <meta name="msapplication-TileColor" content={color} />
         <meta name="theme-color" content={color} />
         <meta name="apple-mobile-web-app-status-bar-style" content={color} />
      </Helmet>
   )
}

Metas.propTypes = {
   title: PropTypes.string,
   description: PropTypes.string,
   cover: PropTypes.object,
   url: PropTypes.string,
   color: PropTypes.string,
}