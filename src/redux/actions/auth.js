
import store from 'store/dist/store.modern';

import * as ACTIONS from '../types';
import authServices from '../services/auth';

function login({ username, password }) {
  function request() {
    return { type: ACTIONS.LOGIN_REQUEST };
  }
  function success(payload) {
    return { type: ACTIONS.LOGIN_SUCCESS, payload };
  }
  function failure() {
    return { type: ACTIONS.LOGIN_FAIL };
  }
  return async (dispatch) => {
    dispatch(request());
    await authServices.login({ username, password }).then(
      (res) => {
        store.set('token', res.headers['x-auth-token']);
        store.set('user', JSON.stringify(res.data.data));

        dispatch(success({ ...res.data.data }));
      },
      (error) => {
        dispatch(failure());
      },
    );
  };
}

function logout() {
  function success() {
    store.remove('token');
    store.remove('user');
    return {
      type: ACTIONS.LOGOUT_SUCCESS,
    };
  }

  return async (dispatch) => {
    authServices.logout().then(async () => {
      await dispatch(success());
      // await dispatch(actions.navigateTo('login'));
    });
  };
}

const authActions = {
  login,
  logout,
};

export default authActions;
