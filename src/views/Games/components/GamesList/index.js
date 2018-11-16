import React from 'react';
import axios from 'axios';

import Repeat from '~/utils/Repeat';
import fetchGames from '~/services/fetchGames';

import GameLoading from './components/GameLoading'
import Game from './components/Game'
import styles from './styles.scss';

export default class GamesList extends React.Component {
   state = {
      games: [],
      loading: true
   }

   componentDidMount() {
      fetchGames(this.activeAxios.token).then(games => this.injectGames(games)).catch(e => { console.log(e) })
   }

   componentWillUnmount() {
      this.activeAxios.cancel('Canceled by the user.')
   }

   activeAxios = axios.CancelToken.source()

   injectGames(games) {
      this.setState({ games, loading: false })
   }

   render() {
      const { loading, games } = this.state;
      if (loading) return <div className="container"><Repeat times={4} component={GameLoading} /></div>
      return (
         <div className={`${styles.gameList} container`}>
            {games.map(gameData => <Game data={gameData} key={gameData.id} />)}
         </div>
      );
   }
}
