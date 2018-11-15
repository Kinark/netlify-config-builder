import React from 'react';

import gameType from '~/types/gameType';

import styles from './styles.scss';


const SubHeader = ({ game }) => (
   <div className={styles.subHeader}>
      <div className="container">
         <h5 className="tk-museo uppercase no-mrg grey-text text-lighten-5">{game.Name}</h5>
      </div>
   </div>
)

SubHeader.propTypes = {
   game: gameType.isRequired
}

export default SubHeader
