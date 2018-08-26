import React from 'react';
import './styles.scss';

import NavItem from './components/NavItem';

const NavLinks = () => {
   return (
      <div>
         <NavItem to="/">Home</NavItem>
         <NavItem to="/games">Games</NavItem>
         <NavItem to="/contact">Contact</NavItem>
         <li>
            <a target="_blank" href="https://medium.com/the-last-flame">BLOG</a>
         </li>
         <NavItem to="/about">About</NavItem>
         <NavItem to="/deeplake">Deeplake</NavItem>
      </div>
   )
}
export default NavLinks;