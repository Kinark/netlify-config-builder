import React from 'react';
import PropTypes from 'prop-types';

import { withContext } from '~/instances/context';

import GamesList from './components/GamesList';
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
      return (
         <React.Fragment>
            <GamesList />
         </React.Fragment>
      )
   }
}

export default withContext(Games);
