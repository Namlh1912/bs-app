import { createStore,applyMiddleware,compose } from 'redux';
import {persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import reducers from '../redux/reducers';

const config = {
  key: 'root',
  storage,
};

const reducer = persistReducer(config, reducers);

export default function configureStore(router, initialState = {}) {
  const store = createStore(
    reducer,
    initialState,
    compose(applyMiddleware(
      thunk,
      promise,

    )),
  );
  const persistor = persistStore(store);

  return {store, persistor};
}
