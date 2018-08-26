import React from 'react';
import styles from './styles.scss';

import { FullTLF } from '~/components/TLFLogo'
import { LifelessLogo } from '~/components/LifelessLogo'

import HomeNav from '~/components/HomeNav'

const Splash = () => (
   <div className={styles.splashFullHeight}>
      <div className={`container row no-mrg-bot xs-center xs-column ${styles.container}`}>
         <div className={styles.tlfContainer}>
            {/* <FullTLF height="173px" /> */}
            <FullTLF height="16.3vh" />
         </div>
         <div className="lifeless-container">
            {/* <LifelessLogo height="225px" /> */}
            <LifelessLogo height="23vh" />
         </div>
         <HomeNav />
      </div>
   </div>
)
export default Splash;
