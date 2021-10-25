import {
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
  USER_SIGNUP_SUCESS,
} from "../ActionTypes";

export const userReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return { user: action.payload };
    case USER_SIGNUP_SUCESS:
      return { user: action.payload };
    case USER_LOGOUT_SUCCESS:
      return { user: null };
    default:
      return state;
  }
};
