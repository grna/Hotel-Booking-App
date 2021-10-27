import {
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
  USER_SIGNUP_SUCESS,
} from "../ActionTypes";
import { fetchUserOrders } from "./ordersActions";
import { userAuthFailed, validateSignUpForm } from "./errorsActions";

export const userSignUp = (form) => async (dispatch) => {
  const valid = await dispatch(validateSignUpForm(form));

  if (!valid) {
    return;
  }

  const res = await fetch("http://localhost:3001/api/users", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  if (!res.ok) {
    const error = await res.text();
    dispatch(
      userAuthFailed({
        count: 1,
        authError: error,
      })
    );
  }

  const user = res.json();
  dispatch({
    type: USER_SIGNUP_SUCESS,
    payload: user,
  });
};

export const userLogIn = (form) => async (dispatch) => {
  const res = await fetch("http://localhost:3001/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  if (!res.ok) {
    const error = await res.text();
    dispatch(userAuthFailed(error));
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
