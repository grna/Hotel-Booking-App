import { FORM_IS_VALID, FORM_NOT_VALID } from "../ActionTypes";

const errors = {
  count: 0,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  rooms: "",
  adults: "",
};

export const errorsReducers = (state = { errors }, action) => {
  switch (action.type) {
    case FORM_NOT_VALID:
      return {
        errors: action.payload,
      };
    case FORM_IS_VALID:
      return {
        errors: action.payload,
      };
    default:
      return state;
  }
};
