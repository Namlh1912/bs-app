import * as ACTIONS from '../types';
import authServices from '../services/auth';
import { AsyncStorage } from 'react-native';

export function Login(username,password) {
  function request() {
    return { type: ACTIONS.LOGIN_REQUEST };
  }
  function success(payload) {
    return { type: ACTIONS.LOGIN_SUCCESS, payload };
  }
  return dispatch => {
    dispatch(request());
    authServices.login(username,password).then(
      (res) => {
        AsyncStorage.setItem('token',res.headers.authorization);
        AsyncStorage.setItem('user', JSON.stringify(res.data.data));
        dispatch(success({ user:res.data.data }));
      }
    ).catch(
      (error) => {
        console.log(error);
        Toast.show({
          text: 'Error! Please try again!',
          position: 'bottom',
          type: 'error',
          buttonText: 'Dismiss',
          duration: 3000
        });
      },
    );
  };
}

function Logout() {
  return{
    type:ACTIONS.LOGOUT_SUCCESS,
  }
}


const authActions = {
  Login,
  Logout
};

export default authActions;