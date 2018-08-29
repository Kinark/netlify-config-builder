import React from 'react';
import PropTypes from 'prop-types';

const Repeat = ({ times, component }) => {
   const elementsArray = []
   const Component = component;
   for (let i = 0; i < times; i++) elementsArray.push(<Component key={i} />)
   return elementsArray;
}

Repeat.propTypes = {
   times: PropTypes.number.isRequired,
   component: PropTypes.func.isRequired
}

export default Repeat;
