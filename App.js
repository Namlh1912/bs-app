import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import configureStore from './src/boot/store';
import Navigation from './src/boot/navigation';

const config = configureStore();

export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={config.store}>
        <PersistGate loading={null} persistor={config.persistor}>
          <Navigation/>
        </PersistGate>
      </Provider>
    );
  }
}

