import React, { useState } from "react";
import PropTypes from "prop-types";
import "./login.css";
import Error from "../common/Error";

const LogIn = ({ errors, userLogIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogInSubmit = (e) => {
    e.preventDefault();
    const form = {
      email: email,
      password: password,
    };
    userLogIn(form);
  };

  return (
    <div className="login-wrapper">
      <h4>Login:</h4>
      <form onSubmit={(e) => onLogInSubmit(e)} className="login-form">
        <label>Email:</label>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></input>
        {errors.loginEmail && <Error text={errors.loginEmail} />}
        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>
        {errors.loginPassword && (
          <Error text={errors.loginPassword} />
        )}
        {errors.userLoginFailed && (
          <Error text={errors.userLoginFailed} />
        )}
        <input
          type="submit"
          className="btn btn-lg"
          value="LogIn"
        ></input>
      </form>
    </div>
  );
};

LogIn.propTypes = {
  errors: PropTypes.object,
  userLogIn: PropTypes.func,
};

export default LogIn;
