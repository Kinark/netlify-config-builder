import React from 'react';
import PropTypes from 'prop-types';

import { withContext } from '~/instances/context';

import './styles.scss';

class Contact extends React.Component {
   static propTypes = {
      context: PropTypes.shape({}).isRequired,
   }

   componentWillMount = () => {
      const { context } = this.props
      context.changeAppTitle('Contact');
   }

   render() {
      return (
         <React.Fragment>
            <div className="container">
               Contact
            </div>
         </React.Fragment>
      )
   }
}

export default withContext(Contact);
