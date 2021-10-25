import React, { useState } from "react";
import PropTypes from "prop-types";
import "./signup.css";

const SignUp = ({ userSignUp }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const onSignUpSubmit = (e) => {
    e.preventDefault();

    const form = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirm: confirm,
    };

    if (password === confirm) {
      userSignUp(form);
    }
  };

  return (
    <div className="signup-wrapper">
      <h4>SignUp:</h4>
      <form
        onSubmit={(e) => {
          onSignUpSubmit(e);
        }}
        className="signup-form"
      >
        <label>First Name:</label>
        <input
          type="text"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        ></input>
        <label>Last Name:</label>
        <input
          type="text"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        ></input>
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
        <label>Confirm Password:</label>
        <input
          type="password"
          onChange={(e) => setConfirm(e.target.value)}
          value={confirm}
        ></input>
        <input
          type="submit"
          className="btn btn-lg"
          value="SignUp"
        ></input>
      </form>
    </div>
  );
};

SignUp.propTypes = {
  userSignUp: PropTypes.func,
};

export default SignUp;
