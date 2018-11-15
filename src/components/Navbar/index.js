import React from 'react';
import styles from './styles.scss';

import NavLinks from '~/components/NavLinks';

const Navbar = () => (
   <nav className={`${styles.navbar} center`}>
      <ul>
         <NavLinks />
      </ul>
   </nav>
)
export default Navbar;
