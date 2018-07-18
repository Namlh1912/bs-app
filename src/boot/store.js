import { createStore,applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import reducers from '../redux/reducers/index';

export default function configureStore(router, initialState = {}) {
  const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(
      thunk,
      promise,
    )),
  );

  return store;
}
