import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import getStore from './store';

export default (props) => {
  const { children, initialState = {}, env = '' } = props;
  const store = getStore(initialState, env);
  // This to reuse Provider tag code and Router. Links need to be wrapped by <Router>.
  // It can be reused by unit tests.
  return(
    <Provider store={store}>
      <Router history={createBrowserHistory(props)}>
        {children}
      </Router>
    </Provider>
  );
}
