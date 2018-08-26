import React from 'react';
import './styles.scss';

import PropTypes from 'prop-types';

const Game = (props) => {
   const data = props.data;
   const {Name, Genres, Platforms, Released, Short_description, Cover, Logo} = props.data;
   return (
      <div className="game-section">
         <div className="container row no-mrg-bot">
            <div className="info">
               <div className="row">
                  <div className="col xs12">
                     <img src={Logo} className="game-logo" alt=""/>
                  </div>
               </div>
               <div className="row no-mrg">
                  <div className="col xs12 m6">
                     <h5 className="upper grey-text text-lighten-4 tk-museo no-mrg">{Name}</h5>
                     <p className="metadata dead-blue-light-text no-mrg-bot">{Genres} ● {Platforms} ● {Released}</p>
                     <p className="description no-mrg">{Short_description}</p>
                  </div>
               </div>
            </div>
            {/* <div>{Name}</div> */}
            <div className="cover-bg">
               <div className="image">
                  <img src={Cover} alt=""/>
               </div>
            </div>
         </div>
      </div>
   )
}
export default Game;

Game.propTypes = {
   data: PropTypes.object.isRequired,
}