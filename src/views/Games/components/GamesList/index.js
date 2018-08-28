import React from 'react';
import axios from 'axios';

import fetchGames from '~/services/fetchGames';

import GameLoading from './components/GameLoading'
import Game from './components/Game'
import styles from './styles.scss';

export default class GamesList extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         games: [],
         loading: true
      };
      this.activeAxios = axios.CancelToken.source()
   }

   componentDidMount() {
      fetchGames(this.activeAxios.token).then(games => this.injectGames(games)).catch()
   }

   componentWillUnmount() {
      this.activeAxios.cancel()
   }

   injectGames(games) {
      this.setState({ games, loading: false })
   }

   render() {
      const { loading, games } = this.state;
      if (loading) return <div className="container"><GameLoading /></div>
      return (
         <div className={`${styles.gameList} container`}>
            {games.map(gameData => <Game data={gameData} key={gameData.id} />)}
         </div>
      );
   }
}
