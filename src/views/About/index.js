import React from 'react';
import PropTypes from 'prop-types';

import { withContext } from '~/instances/context';
import { FlameTLF } from '~/components/TLFLogo';

import clockImg from './images/clock_image.jpg';
import styles from './styles.scss';

class About extends React.Component {
   static propTypes = {
      context: PropTypes.shape({}).isRequired,
   }

   componentWillMount = () => {
      const { context } = this.props
      context.turnOnInverted();
      context.changeAppTitle('About');
   }

   componentWillUnmount = () => {
      const { context } = this.props
      context.turnOffInverted();
   }

   render() {
      return (
         <React.Fragment>
            <div className="container">
               <div className="row">
                  <div className="col xs12 l6 white-text">
                     <div className={styles.introduction}>
                        <h3 className="tk-europa weight-bold white-text">The Last Flame</h3>
                        <p className="white-text">
                           The Last Flame is a tiny indie development team, idealized during a cold and illusory winter, in the end of 2015. The members feel the flame burning inside, projecting the dream of a change.
                        </p>
                        <p className="white-text">
                           The bearers of the last flame don't want to extinguish the dark, just fill the gap left by years of artistic insanity. With very talented writers, designers, illustrators and programmers, we wish to create (and why not... publish?) great stories and content, starting with our first love: games. We hope to lit your way and make you fall in love with our games :)
                        </p>
                     </div>
                  </div>
               </div>
            </div>
            <div className={styles.rotatedSection}>
               <div className={styles.viewportMask}>
                  <div className={styles.bigWhiteTriangle}>
                     <div className={styles.clockWrapper}>
                        <img src={clockImg} alt="" />
                     </div>
                  </div>
               </div>
               <div className={styles.content}>
                  <div className="container">
                     <div className="row">
                        <div className="col s4 hide-on-extra-small-only center"><FlameTLF className={styles.tlfLogo} color="#fff" height="380px" /></div>
                        <div className="col xs12 s8">
                           <div className={styles.textWrapper}>
                              <h2 className="tk-europa weight-bold">So...</h2>
                              <p>As a little company with a few assiduous members that are working really hard to make a dream come true, we feel kind of ashamed to write about ourselves.</p>
                              <p>So take our names and base functions:</p>
                              <div className="row">
                                 <div className="col s4 xs12">Bruno Godoi<br />Programmer</div>
                                 <div className="col s4 xs12">Bruno Godoi<br />Programmer</div>
                              </div>
                              <div className="row">
                                 <div className="col s4 xs12">Bruno Godoi<br />Programmer</div>
                                 <div className="col s4 xs12">Bruno Godoi<br />Programmer</div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="row no-mrg-bot">
                        <div className="col xs12">
                           <h3 className="tk-europa weight-bold">And the moon became<br />a red stain...</h3>
                           <p>
                              ...big, filling the sky and the dreams of those who crawled underground - but they were not alive. There was chaos through the ages and the inheritance was the disgraceful conformism and artistic delusion that strangely was called normality. But then came the flame and the burning cinders, and they offended people, overshadowing and pushing away the fanatics who became one with the dark.
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </React.Fragment>
      )
   }
}

export default withContext(About);
