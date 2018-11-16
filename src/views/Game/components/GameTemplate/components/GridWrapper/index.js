import React from 'react';
import PropTypes from 'prop-types';

const GridWrapper = ({ size, children }) => <div className={`col ${size}`}>{children}</div>

GridWrapper.propTypes = {
   size: PropTypes.string,
   children: PropTypes.node.isRequired,
}

GridWrapper.defaultProps = {
   size: 'xs12',
}

export default GridWrapper
