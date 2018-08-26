import React from 'react';

import NavItem from './components/NavItem';
import './styles.scss';

export default () => (
   <React.Fragment>
      <NavItem to="/">Home</NavItem>
      <NavItem to="/games">Games</NavItem>
      <NavItem to="/contact">Contact</NavItem>
      <li>
         <a target="_blank" rel="noopener noreferrer" href="https://medium.com/the-last-flame">BLOG</a>
      </li>
      <NavItem to="/about">About</NavItem>
      <NavItem to="/deeplake">Deeplake</NavItem>
   </React.Fragment>
)
