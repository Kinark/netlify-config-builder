import React from 'react';
import './styles.scss';

import Game from './components/Game';
import { ajaxUrl } from '~/components/Paths';
import compareKeys from '~/utils/compareKeys';
import PropTypes from 'prop-types';

import axios from 'axios';

export default class GamesLoader extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         games: [
            {
               ID: '',
               Name: 'Looooooool',
               Genres: '',
               Platforms: '',
               Released: '',
               Short_description: '',
               Cover: '',
               Logo: '',
            },
         ],
      };
   }
   
   componentDidMount() {
      const that = this;
      const gameData = localStorage.getItem('gameData');
      if (!gameData) {
         axios({
            method: 'get',
            url: that.props.url,
         }).then(response => {
            const retrieved = response.data[that.props.parent];
            if(!compareKeys(that.state.games, retrieved)) {
               console.log(that.state.games);
               console.log(retrieved);
               throw "Provided API not consistent";
            };
            that.setState({games: retrieved})
            // localStorage.setItem('gameData', JSON.stringify(response.data));
            localStorage.setItem('gameData', JSON.stringify(retrieved));
         }).catch(error => {
            throw error;
         });
      } else {
         // console.log(JSON.parse(gameData));
         that.setState({games: JSON.parse(gameData)})
      }
   }
   
   componentWillUnmount() {
   }
   
   render() {
      let GAMES = this.state.games;
      return (
         GAMES.map(gameData => (
            <Game data={gameData} key={gameData.ID} />
         ))
      );
   }
}

GamesLoader.propTypes = {
   url: PropTypes.string.isRequired,
   parent: PropTypes.string.isRequired,
}