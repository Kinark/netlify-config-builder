import React from 'react';
import PropTypes from 'prop-types';

import { Title } from '~/components/Metas';
import { withContext } from '~/instances/context';

// import GamesList from './components/GamesList';
// import styles from './styles.scss';

class Game extends React.Component {
   static propTypes = {
      context: PropTypes.shape({}).isRequired,
   }

   componentWillMount = () => {
      const { context } = this.props
      context.changeAppTitle(null);
   }

   render() {
      return (
         <React.Fragment>
            <Title></Title>
            Game
         </React.Fragment>
      )
   }
}

export default withContext(Game);
