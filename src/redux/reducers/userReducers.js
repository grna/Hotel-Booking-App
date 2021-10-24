import { USER_SIGNUP_SUCESS } from "../ActionTypes";

export const userReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNUP_SUCESS:
      return { user: action.payload };
    default:
      return state;
  }
};
