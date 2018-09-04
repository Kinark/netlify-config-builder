import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';
import axios from 'axios';

import { withContext } from '~/instances/context';
import fetchGames from '~/services/fetchGames';

import GameTemplate from './components/GameTemplate';
// import styles from './styles.scss';

class Game extends React.Component {
   static propTypes = {
      match: ReactRouterPropTypes.match.isRequired,
      context: PropTypes.shape({}).isRequired,
   }

   state = {
      gameInfo: {},
      loading: true
   }

   componentWillMount = () => {
      const { context } = this.props
      context.changeAppTitle('Loading', false);
   }

   componentDidMount() {
      const { match } = this.props
      const gameId = match.params.id;
      fetchGames(this.activeAxios.token, gameId).then(gameInfo => this.injectGames(gameInfo)).catch(e => { console.log(e) })
   }

   componentWillUnmount() {
      this.activeAxios.cancel('Canceled by the user.')
   }

   activeAxios = axios.CancelToken.source()

   injectGames(gameInfo) {
      this.setState({ gameInfo, loading: false })
   }

   render() {
      const { loading, gameInfo } = this.state;
      if (loading) return <p>Loading game...</p>
      console.log(gameInfo)
      return <GameTemplate data={gameInfo} />
   }
}

export default withContext(Game);
