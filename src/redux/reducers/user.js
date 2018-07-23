import * as ACTIONS from '../types';

export default function users(state = [], action) {

  switch (action.type) {

    case ACTIONS.USER_SIGNUP_REQUEST:
      return [
        ...state,
      ];
    case ACTIONS.USER_SIGNUP_SUCCESS:
      console.log(action.payload.user);
      return [
        ...state, action.payload.user,
      ];
    case ACTIONS.USER_SIGNUP_FAIL:
      return [
        ...state,
      ];
    default:
      return state;
  }
}
