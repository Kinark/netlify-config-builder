import React from 'react';

import gameType from '~/types/gameType';

import styles from './styles.scss';

const GameNavbar = ({ game }) => (
   <nav className={styles.navbar}>
      <div className="container">
         <ul>
            <li className={styles.active}><a href="#"><i className="icon-video-games-gameboy" />General</a></li>
            {game.BlogURL && <li><a target="_blank" rel="noopener noreferrer" href={game.BlogURL}><i className="icon-hot-air-balloon" />Blog</a></li>}
            {game.SteamURL && <li><a target="_blank" rel="noopener noreferrer" href={game.SteamURL}><i className="icon-shopping-basket-1" />Buy on Steam</a></li>}
            {game.GooglePlayURL && <li><a target="_blank" rel="noopener noreferrer" href={game.GooglePlayURL}><i className="icon-shopping-basket-1" />Buy on GP</a></li>}
            {game.AppStoreURL && <li><a target="_blank" rel="noopener noreferrer" href={game.AppStoreURL}><i className="icon-shopping-basket-1" />Buy on AppStore</a></li>}
            {game.MediaKit && <li><a target="_blank" rel="noopener noreferrer" href={game.MediaKit.url}><i className="icon-receipt-1" />Media Kit</a></li>}
         </ul>
      </div>
   </nav>
)

GameNavbar.propTypes = {
   game: gameType.isRequired
}

export default GameNavbar
