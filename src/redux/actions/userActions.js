import {
  USER_LOGIN_SUCCESS,
  USER_SIGNUP_SUCESS,
} from "../ActionTypes";
import { fetchUserOrders } from "./ordersActions";

export const userSignUp = (form) => async (dispatch) => {
  await fetch("http://localhost:3001/api/users", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  })
    .then((res) => res.json())
    .then((user) => {
      dispatch({
        type: USER_SIGNUP_SUCESS,
        payload: user,
      });
    })
    .catch((error) => console.log(error));
};

export const userLogIn = (form) => async (dispatch) => {
  await fetch("http://localhost:3001/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  })
    .then((res) => res.json())
    .then((user) => {
      dispatch(fetchUserOrders(user.email));
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: user,
      });
    })
    .catch((error) => console.log(error));
};
