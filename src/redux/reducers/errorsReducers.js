import {
  CREATE_ORDER_FAILED,
  FETCH_USER_ORDERS_FAILED,
  VALIDATE_FORM_SUCCESS,
  VALIDATE_FORM_FAILED,
  USER_LOGIN_FAILED,
} from "../ActionTypes";

const errors = {};

export const errorsReducers = (state = { errors }, action) => {
  switch (action.type) {
    case VALIDATE_FORM_FAILED:
      return {
        errors: action.payload,
      };
    case VALIDATE_FORM_SUCCESS:
      return {
        errors: action.payload,
      };
    case CREATE_ORDER_FAILED:
      return {
        errors: action.payload.errors,
      };
    case USER_LOGIN_FAILED:
      return {
        errors: action.payload,
      };
    case FETCH_USER_ORDERS_FAILED:
      return { errors: action.payload };
    default:
      return state;
  }
};
