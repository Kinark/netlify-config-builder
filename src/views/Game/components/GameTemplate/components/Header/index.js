import React from 'react';

import apiPath from '~/utils/apiPath';
import gameType from '~/types/gameType';

import styles from './styles.scss';

const Header = ({ game }) => {
   const cover = game.GameCover || game.GamesListCover;
   return (
      <div className={styles.header} style={{ backgroundImage: `url(${apiPath}${cover.url})` }}>
         <div className={`${styles.content} container`}>
            <div className="row no-mrg-bot">
               <div className="col s12 m8 l6 offset-m3 offset-l6">
                  <h4 className={`weight-medium tk-museo grey-text text-lighten-5 uppercase ${styles.name}`}>{game.Name}</h4>
                  <h5 className={`weight-light grey-text text-lighten-1 ${styles.effectPhrase}`}>{game.EffectPhrase}</h5>
                  <p className={`weight-light grey-text text-lighten-3 ${styles.shortDescription}`}>{game.ShortDescription}</p>
               </div>
            </div>
         </div>
      </div>
   )
}

Header.propTypes = {
   game: gameType.isRequired
}

export default Header
