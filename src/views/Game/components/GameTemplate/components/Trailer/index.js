import React from 'react';

import Video from '~/components/Video'
import apiPath from '~/utils/apiPath';
import gameType from '~/types/gameType';

// import styles from './styles.scss';

const Trailer = ({ game }) => (
   <React.Fragment>
      <h5 className="tk-museo"><i className="icon-video-clip-3" />Trailer</h5>
      <div className="row">
         <div className="col xs12">
            {game.TrailerURL
               ? <Video src={game.TrailerURL} title={`${game.Name} Trailer`} />
               : <img src={apiPath + game.Logo.url} className="center" height="200" alt={game.Name} />
            }
         </div>
      </div>
   </React.Fragment>
)

Trailer.propTypes = {
   game: gameType.isRequired
}

export default Trailer
