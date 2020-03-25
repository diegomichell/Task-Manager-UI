import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from "./sagas";
import UserActions from "./actions/UserActions";
import {composeWithDevTools} from 'redux-devtools-extension';


export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  // @ts-ignore
  const isReduxToolsEnabled: any = window.__REDUX_DEVTOOLS_EXTENSION__ || false;

  const store = createStore(
    rootReducer,
    isReduxToolsEnabled ?
      compose(applyMiddleware(sagaMiddleware), composeWithDevTools())
      : applyMiddleware(sagaMiddleware)
  );

  sagaMiddleware.run(rootSaga);

  if (localStorage.token) {
    store.dispatch(UserActions.login(localStorage.user, localStorage.token));
  }

  return store;
}

