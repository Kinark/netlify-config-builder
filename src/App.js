import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Title } from '~/components/Metas';

import { AppContext } from '~/instances/context';

import PageTitle from '~/components/PageTitle';
import Navbar from '~/components/Navbar';
import Footer from '~/components/Footer';
import Home from '~/views/Home';
import Contact from '~/views/Contact';
import About from '~/views/About';
import Games from '~/views/Games';
import Deeplake from '~/views/Deeplake';

import styles from './styles.scss'
import './styles.global.scss';
import './components/Ceres/styles.global.scss';

export default class App extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         inverted: false,
         appTitle: 'The Last Flame',
      };
   }

   turnOnInverted = () => { this.setState({ inverted: true }); };

   turnOffInverted = () => { this.setState({ inverted: false }); };

   changeAppTitle = appTitle => { this.setState({ appTitle }); };

   render() {
      const { inverted, appTitle } = this.state;
      const { turnOnInverted, turnOffInverted, changeAppTitle } = this;
      return (
         <AppContext.Provider value={{ inverted, appTitle, turnOnInverted, turnOffInverted, changeAppTitle }}>
            <Title>{appTitle}</Title>
            <div className={`${styles.appColors} ${inverted ? styles.inverted : ''}`}>
               <Route path="/(.+)" component={Navbar} />
               <Route path="/(.+)" component={PageTitle} />
               <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/contact" component={Contact} />
                  <Route path="/about" component={About} />
                  <Route path="/games" component={Games} />
                  <Route path="/deeplake" component={Deeplake} />
               </Switch>
               <Route component={Footer} />
            </div>
            <div className="screen-detector" />
         </AppContext.Provider>
      );
   }
}
