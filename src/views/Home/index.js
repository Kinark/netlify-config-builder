import React from 'react';
import PropTypes from 'prop-types';

import { Title } from '~/components/Metas';
import { withContext } from '~/instances/context';

import './styles.scss';

import Splash from './components/Splash';

class Home extends React.Component {
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
            <Title>The Last Flame</Title>
            <Splash />
         </React.Fragment>
      )
   }
}

export default withContext(Home);
