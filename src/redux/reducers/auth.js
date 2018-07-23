import { AsyncStorage } from "react-native";
import * as ACTIONS from '../types';

const INITIAL_STATE = {
  isLoading: false,
  isLoggedIn: true,
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTIONS.LOGIN_REQUEST:
      return {
        isLoggedIn:false
      };
    case ACTIONS.LOGIN_SUCCESS:
      return {
        isLoggedIn: true,
        ...action.payload,
      };
    case ACTIONS.LOGIN_FAIL:
      return {
        isLoggedIn: false,
      };
    case ACTIONS.LOGOUT_SUCCESS:
      AsyncStorage.removeItem('token');
      AsyncStorage.removeItem('user');
      return {
        isLoggedIn: false,
      };
    default:
      return state;
  }
}

