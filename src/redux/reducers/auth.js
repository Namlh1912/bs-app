import store from 'store/dist/store.modern';
import * as ACTIONS from '../types';

const user = store.get('user');
const token = store.get('token');
const initialState = user ? { loggedIn: true, ...JSON.parse(user), token } : { loggedIn: false };

export default function auth(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.LOGIN_REQUEST:
      return {
        loggedIn: false,
      };
    case ACTIONS.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        ...action.payload,
      };
    case ACTIONS.LOGIN_FAIL:
      return {
        loggedIn: false,
      };
    case ACTIONS.LOGOUT_SUCCESS:
      return {
        loggedIn: false,
      };
    default:
      return state;
  }
}

