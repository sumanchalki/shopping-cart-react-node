import { createStore, applyMiddleware } from 'redux';
import throttle from 'lodash.throttle';
import rootReducer from './reducers';
import { loadState, saveState } from './localStorage';
import thunk from "redux-thunk";
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
//import stateValidator from './middlewares/stateValidator';

let store;
const sagaMiddleware = createSagaMiddleware();

export default (initialState, env = 'real') => {
  switch (env) {
    case 'real':
    default:
      const persistedState = loadState();
      store = createStore(rootReducer, persistedState, applyMiddleware(thunk, sagaMiddleware));
      sagaMiddleware.run(rootSaga);

      store.subscribe(
        // Throttle: invokes a function at most once per every 1000 milliseconds.
        throttle(() => {
          saveState({
            cart: store.getState().cart,
            user: store.getState().user
          });
        }, 1000)
      );
      break;
    case 'test':
      store = createStore(rootReducer, initialState, applyMiddleware(thunk, sagaMiddleware));
      sagaMiddleware.run(rootSaga);
      break;
  }
  return store;
}
