import React from 'react';
import PropTypes from 'prop-types';

import apiPath from '~/utils/apiPath';

import styles from './styles.scss';

const Game = ({ data }) => {
   const { GamesListCover, Logo, Name, Genre, Platforms, Released, ShortDescription } = data;
   console.log(GamesListCover.url)
   return (
      <div className={styles.game} style={{ backgroundImage: `url(${apiPath + GamesListCover.url})` }}>
         <div className={styles.info}>
            <img className={styles.logo} src={apiPath + Logo.url} alt={Name} />
            <div className={styles.meta}>{Genre} ● {Platforms} ● {Released}</div>
            <p className={styles.name}>{Name}</p>
            <p className={styles.description}>{ShortDescription}</p>
         </div>
      </div>
   )
}

Game.propTypes = {
   data: PropTypes.shape({}).isRequired,
}

export default Game
