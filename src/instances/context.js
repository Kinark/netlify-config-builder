import React from 'react';

export const AppContext = React.createContext({
   bw: false,
   appTitle: 'The Last Flame',
   appTitleBar: true,
   turnOnInverted: () => { },
   turnOffInverted: () => { },
   changeAppTitle: () => { },
});

export const withContext = Component => props => (
   <AppContext.Consumer>
      {context => <Component {...props} context={context} />}
   </AppContext.Consumer>
)
