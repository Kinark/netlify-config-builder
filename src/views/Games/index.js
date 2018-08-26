import React from 'react';
import PropTypes from 'prop-types';

import { withContext } from '~/instances/context';
import { ajaxUrl } from '~/components/Paths';

import GamesLoader from './components/GamesLoader';
import './styles.scss';

class Games extends React.Component {
   static propTypes = {
      context: PropTypes.shape({}).isRequired,
   }

   componentWillMount = () => {
      const { context } = this.props
      context.changeAppTitle('Games');
   }

   render() {
      // const apiUrl = ajaxUrl+"games?columns=Name,Genres,Platforms,Released,Short_description";
      const apiUrl = `${ajaxUrl}games_page`;
      return (
         <React.Fragment>
            <GamesLoader url={apiUrl} parent="games_page" />
         </React.Fragment>
      )
   }
}

export default withContext(Games);
