import { USER_SIGNUP_SUCESS } from "../ActionTypes";

export const userSignUp = (form) => async (dispatch) => {
  await fetch("http://localhost:3001/api/signup", {
    method: "POST",
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
