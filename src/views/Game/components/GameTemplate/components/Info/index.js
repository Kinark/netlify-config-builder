import React from 'react';

import apiPath from '~/utils/apiPath';
import gameType from '~/types/gameType';

// import styles from './styles.scss';

const Info = ({ game }) => (
   <React.Fragment>
      <h5 className="tk-museo"><i className="icon-box-handle-1" />Info</h5>
      <div className="row">
         <div className="col xs8">
            <span className="weight-bold">Genre: </span>{game.Genre}<br />
            <span className="weight-bold">Released: </span>{game.Released}<br />
            <span className="weight-bold">Release date: </span>{game.ReleaseDate}<br />
            <span className="weight-bold">Platforms: </span>{game.Platforms}<br />
         </div>
         <div className="col xs4">
            <img src={apiPath + game.Logo.url} height="100" alt={game.Name} />
         </div>
      </div>
      <h5 className="tk-museo">Sinopse</h5>
      <div className="row">
         <div className="col xs12">
            <p className="no-mrg-top">{game.Description}</p>
         </div>
      </div>
   </React.Fragment>
)

Info.propTypes = {
   game: gameType.isRequired
}

export default Info
