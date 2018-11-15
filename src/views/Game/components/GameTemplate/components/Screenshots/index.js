import React from 'react';
import { PhotoSwipe, PhotoSwipeGallery } from 'react-photoswipe';

import apiPath from '~/utils/apiPath';
import gameType from '~/types/gameType';

import './styles.global.scss';
// import styles from './styles.scss';


export default class Screenshots extends React.Component {
   static propTypes = {
      game: gameType.isRequired
   }

   state = {
      isOpen: true
   }

   handleClose = () => this.setState({ isOpen: false })

   render() {
      const { game } = this.props
      const { isOpen } = this.state
      const screenshots = game.Screenshots.map(ss => ({ src: apiPath + ss.url, title: 'Lol', w: 200, h: 100 }))
      console.log(screenshots)
      return (
         <React.Fragment>
            <h5 className="tk-museo"><i className="icon-picture-layer-1" />Screenshots</h5>
            <div className="row">
               <div className="col xs12">
                  <PhotoSwipe isOpen={isOpen} items={screenshots} onClose={this.handleClose} />
                  <PhotoSwipeGallery items={screenshots} />
               </div>
            </div>
         </React.Fragment>
      )
   }
}
