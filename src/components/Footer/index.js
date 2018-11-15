import React from 'react';
import PropTypes from 'prop-types';

import { withContext } from '~/instances/context';
import { FlameTLF, TypeTLF } from '~/components/TLFLogo';
import { DiscordLink, FacebookLink, YoutubeLink, TwitterLink } from '~/components/SocialLinks';

import styles from './styles.scss';


class Footer extends React.Component {
   static propTypes = {
      context: PropTypes.shape({}).isRequired,
   }

   render() {
      const { context } = this.props;
      return (
         <footer className={`${context.inverted ? 'white' : 'dead-blue'} ${styles.footer}`}>
            <div className="container">
               <div className="row">
                  <div className="col xs12 center">
                     <h5 className="dead-blue-light-text tk-museo weight-thin">...and it shall not be forgotten.</h5>
                  </div>
               </div>
               <div className="row xs-middle no-mrg-bot">
                  <div className="col xs12 m4">
                     <h5 className="weight-thin no-mrg">Follow us</h5>
                     <h6 className="weight-thin no-mrg-top">If you want...</h6>
                     <div>
                        <DiscordLink />
                        <FacebookLink />
                        <YoutubeLink />
                        <TwitterLink />
                     </div>
                  </div>
                  <div className="col xs12 m4 center">
                     Add your email to our newsletter.<br />
                     We won't flood you. It's a promise.
                     <div className="row no-mrg">
                        <div className="input-field col xs12 center">
                           <input type="text" name="lol" id="lol" placeholder="example@email.com" className="center dead-blue-clear-text" />
                        </div>
                     </div>
                  </div>
                  <div className="col xs12 m4 middle-xs">
                     <div className="row xs-middle no-mrg">
                        <div className="col xs"><TypeTLF color="#C4C3C7" height="20px" /></div>
                        <div className="col xs"><FlameTLF color="#C4C3C7" height="135px" /></div>
                     </div>
                  </div>
               </div>
            </div>
         </footer>
      );
   }
}

export default withContext(Footer);
