import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class NavItem extends React.Component {
   render() {
      var isActive = this.context.router.route.location.pathname === this.props.to;
      var className = isActive ? 'active' : '';

      return (
         <li className={className}>
            <Link exact="true" {...this.props}>
               {this.props.children}
            </Link>
         </li>
      );
   }
}

NavItem.contextTypes = {
   router: PropTypes.object
};

export default NavItem;
