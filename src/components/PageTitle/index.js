import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

import { withContext } from '~/instances/context';
import { Title } from '~/components/Metas';

class PageTitle extends React.Component {
   static propTypes = {
      context: PropTypes.shape({}).isRequired,
   }

   render() {
      const { context } = this.props;
      return (
         <div className={`${styles.pageTitle} ${context.inverted ? styles.inverted : ''} tk-europa weight-bold`}>
            <div className="container">
               <div className="row no-mrg">
                  <div className="col xs12">
                     <h1 className="no-mrg no-pad">{context.appTitle}</h1>
                  </div>
               </div>
            </div>
            <Title>{context.appTitle}</Title>
         </div>
      );
   }
}

export default withContext(PageTitle);
