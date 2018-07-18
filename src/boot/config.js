import axios from 'axios';
import store from 'store/dist/store.modern';

import statusActions from '../redux/actions/status';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// Add a request interceptor
axios.interceptors.request.use((config) => {
  // Do something before request is sent
  config.headers['x-auth-token'] = store.get('token');
  global.store.dispatch(statusActions.loading());
  return config;
}, (error) => {
  // Do something with request error
  const mess = error.response ? error.response.data.error.message : error.message;
  global.store.dispatch(statusActions.failure(mess, error));
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    // Do something with response data
    global.store.dispatch(statusActions.success('Success'));
    return response;
  }
  , (error) => {
    const mess = error.response ? error.response.data.error.message : error.message;
    global.store.dispatch(statusActions.failure(mess, error));
    return Promise.reject(error);
  },
);
