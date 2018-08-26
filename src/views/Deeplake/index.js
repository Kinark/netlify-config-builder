import React from 'react';
import PropTypes from 'prop-types';

import { withContext } from '~/instances/context';

import './styles.scss';

class DeepLake extends React.Component {
   static propTypes = {
      context: PropTypes.shape({}).isRequired,
   }

   componentWillMount = () => {
      const { context } = this.props
      context.changeAppTitle('Deep Lake');
   }

   render() {
      return (
         <React.Fragment>
            <div className="container">
               Deep Lake
            </div>
         </React.Fragment>
      )
   }
}

export default withContext(DeepLake);
