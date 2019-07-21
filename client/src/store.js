import { createStore, applyMiddleware } from 'redux';
import throttle from 'lodash.throttle';
import rootReducer from './reducers';
import { loadState, saveState } from './localStorage';
import thunk from "redux-thunk";
//import stateValidator from './middlewares/stateValidator';

let store;

export default (initialState, env = 'real') => {
  switch (env) {
    case 'real':
    default:
      const persistedState = loadState();
      store = createStore(rootReducer, persistedState, applyMiddleware(thunk));

      store.subscribe(
        // Throttle: invokes a function at most once per every 1000 milliseconds.
        throttle(() => {
          saveState({
            cart: store.getState().cart
          });
        }, 1000)
      );
      break;
    case 'test':
      store = createStore(rootReducer, initialState, applyMiddleware(thunk));
      break;
  }
  return store;
}
