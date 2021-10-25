import React, { useState } from "react";
import PropTypes from "prop-types";
import "./login.css";

const LogIn = ({ userLogIn }) => {
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
        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>
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
  userLogIn: PropTypes.func,
};

export default LogIn;
