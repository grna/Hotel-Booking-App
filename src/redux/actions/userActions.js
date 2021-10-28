import {
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
  USER_SIGNUP_SUCESS,
} from "../ActionTypes";
import { fetchUserOrders } from "./ordersActions";
import {
  userLoginFailed,
  userSignUpFailed,
  validateSignUpForm,
  validateLogInForm,
} from "./errorsActions";
import SimpleCrypto from "simple-crypto-js";

const hashIt = (plainTxt) => {
  const secretKey = "/.awdT613sevn';@aa&^J2";
  const simpleCrypto = new SimpleCrypto(secretKey);
  return simpleCrypto.encrypt(plainTxt);
};

export const userSignUp = (form) => async (dispatch) => {
  const valid = await dispatch(validateSignUpForm(form));
  if (!valid) {
    return;
  }

  const encrypted = {
    ...form,
    password: hashIt(form.password),
  };

  const res = await fetch("http://localhost:3001/api/users", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(encrypted),
  });

  if (!res.ok) {
    const error = await res.text();
    dispatch(userSignUpFailed(error));
    return;
  }

  const user = await res.json();
  dispatch({
    type: USER_SIGNUP_SUCESS,
    payload: user,
  });
};

export const userLogIn = (form) => async (dispatch) => {
  const valid = await dispatch(validateLogInForm(form));
  if (!valid) {
    return;
  }

  const encrypted = {
    email: form.email,
    password: hashIt(form.password),
  };

  const res = await fetch("http://localhost:3001/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(encrypted),
  });

  if (!res.ok) {
    const error = await res.text();
    dispatch(userLoginFailed(error));
    return;
  }

  const user = await res.json();
  dispatch(fetchUserOrders(user.email));
  dispatch({
    type: USER_LOGIN_SUCCESS,
    payload: user,
  });
};

export const userLogOut = () => (dispatch) => {
  dispatch({ type: USER_LOGOUT_SUCCESS });
};
