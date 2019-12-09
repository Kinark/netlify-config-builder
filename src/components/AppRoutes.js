import React, { PureComponent } from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from '~/views/Home'
// import Component from '~/views/Component';

export default class AppRoutes extends PureComponent {
   render() {
      return (
         <Switch>
            <Route exact path="/" component={Home} />
            {/* <Route exact path="/component" component={Component} /> */}
         </Switch>
      )
   }
}
