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

  await fetch("http://localhost:3001/api/users", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  }).then((res) => {
    if (res.ok) {
      res
        .json()
        .then((user) => {
          dispatch({
            type: USER_SIGNUP_SUCESS,
            payload: user,
          });
        })
        .catch((error) => console.log(error));
    } else {
      res.text().then((error) => {
        dispatch(
          userAuthFailed({
            count: 1,
            authError: error,
          })
        );
      });
    }
  });
};

export const userLogIn = (form) => async (dispatch) => {
  await fetch("http://localhost:3001/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  }).then((res) => {
    if (res.ok) {
      res
        .json()
        .then((user) => {
          dispatch(fetchUserOrders(user.email));
          dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: user,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      res.text().then((error) => {
        dispatch(
          userAuthFailed({
            count: 1,
            authError: error,
          })
        );
      });
    }
  });
};

export const userLogOut = () => (dispatch) => {
  dispatch({ type: USER_LOGOUT_SUCCESS });
};
