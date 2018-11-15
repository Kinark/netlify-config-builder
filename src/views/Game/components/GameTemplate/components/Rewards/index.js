import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './styles.scss';

let cx = classNames.bind(styles);

const Rewards = props => (
   <React.Fragment>
      <h5 className="tk-museo"><i className="icon-rewards-trophy-5" />Rewards</h5>
      <div className="row">
         <div className="col xs12">
         </div>
      </div>
   </React.Fragment>
)

Rewards.propTypes = {

}

export default Rewards
