import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const Video = ({ src, title, ...rest }) => (
   <div className={styles.videoContainer} {...rest}>
      <iframe title={title} width="560" height="315" src={src} frameBorder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
   </div>
)

Video.propTypes = {
   src: PropTypes.string.isRequired,
   title: PropTypes.string.isRequired,
}

export default Video
