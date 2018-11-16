import React from 'react';
import PropTypes from 'prop-types';

import gameType from '~/types/gameType';

import styles from './styles.scss';


const Press = ({ game }) => (
   <React.Fragment>
      <h5 className="tk-museo"><i className="icon-ring-planet" />Press</h5>
      <div className={styles.press}>
         {game.press.filter(article => article.Active === true).map(article => <Article data={article} key={article.id} />)}
      </div>
   </React.Fragment>
)

Press.propTypes = {
   game: gameType.isRequired
}

const Article = ({ data }) => (
   <a href={data.Link} target="_blank" rel="noopener noreferrer">
      <div className={styles.article}>
         <div className="weight-bold">{data.Title}</div>
         <div className="dead-blue-clear-text">{data.Description}</div>
         <div className="dead-blue-light-text">{data.Date}</div>
      </div>
   </a>
)

Article.propTypes = {
   data: PropTypes.shape({
      Title: PropTypes.string,
      Description: PropTypes.string,
      Date: PropTypes.string,
      Link: PropTypes.string
   }).isRequired,
}


export default Press
