import React from 'react';
import PropTypes from 'prop-types';
import getSlug from 'speakingurl';
import { Link } from 'react-router-dom';

import apiPath from '~/utils/apiPath';

import styles from './styles.scss';

const Game = ({ data }) => {
   const { GamesListCover, Logo, Name, Genre, Platforms, Released, ShortDescription, id } = data;
   return (
      <Link to={`/game/${getSlug(Name)}`}>
         <div className={styles.game} style={{ backgroundImage: `url(${apiPath}${GamesListCover.url})` }}>
            <div className={styles.info}>
               <img className={styles.logo} src={apiPath + Logo.url} alt={Name} />
               <div className={styles.meta}>{Genre} ● {Platforms} ● {Released}</div>
               <p className={styles.name}>{Name}</p>
               <p className={styles.description}>{ShortDescription}</p>
            </div>
         </div>
      </Link>
   )
}

Game.propTypes = {
   data: PropTypes.shape({}).isRequired,
}

export default Game
