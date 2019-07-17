import React, { PureComponent } from 'react'
import { Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition'

import Home from '~/views/Home';
// import Component from '~/views/Component';

export default class AppRoutes extends PureComponent {
   render() {
      return (
         <AnimatedSwitch atEnter={{ opacity: 0 }} atLeave={{ opacity: 0 }} atActive={{ opacity: 1 }} className="switch-wrapper">
            <Route exact path="/" component={Home} />
            {/* <Route exact path="/component" component={Component} /> */}
         </AnimatedSwitch>
      )
   }
}
