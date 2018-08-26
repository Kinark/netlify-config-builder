import React from 'react';
import styles from './styles.scss';

import NavLinks from '~/components/NavLinks';

const HomeNav = () => (
   <nav className={`${styles.homeNavbar} center`}>
      <ul>
         <NavLinks />
      </ul>
   </nav>
)
export default HomeNav;
