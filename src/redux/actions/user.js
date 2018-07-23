import * as ACTIONS from '../types';
import userServices from '../services/user';

export function SignUp(data) {
  function request() {
    return { type: ACTIONS.USER_SIGNUP_REQUEST };
  }
  function success(payload) {
    return { type: ACTIONS.USER_SIGNUP_SUCCESS, payload };
  }
  function failure() {
    return { type: ACTIONS.USER_SIGNUP_FAIL };
  }

  return async (dispatch) => {
    dispatch(request());
    console.log(data);
    await userServices.signUp(data).then(
      (res) => {
        console.log(res);
        dispatch(success({ user: res.data.data }));
      },
      () => {
        dispatch(failure());
      },
    );
  };
}

const userActions = {
  SignUp
};

export default userActions;