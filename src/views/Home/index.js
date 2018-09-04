import React from 'react';
import PropTypes from 'prop-types';

import { withContext } from '~/instances/context';

import './styles.scss';

import Splash from './components/Splash';

class Home extends React.Component {
   static propTypes = {
      context: PropTypes.shape({}).isRequired,
   }

   componentWillMount = () => {
      const { context } = this.props
      context.changeAppTitle('The Last Flame', false);
   }

   render() {
      return (
         <React.Fragment>
            <Splash />
         </React.Fragment>
      )
   }
}

export default withContext(Home);
