import React from "react";
import Login from "./LogIn";
import { mount } from "enzyme";

function renderLoginForm(args) {
  const defaultProps = {
    errors: {},
    userLogIn: () => {},
  };

  const props = { ...defaultProps, ...args };
  return mount(<Login {...props}></Login>);
}

it("renders form", () => {
  const wrapper = renderLoginForm();
  expect(wrapper.find("form").length).toBe(1);
});

it("validates input fields", () => {
  const args = {
    errors: {
      count: 1,
      userLoginFailed: "User does not exist.",
    },
  };

  const wrapper = renderLoginForm(args);
  expect(wrapper.find(".error").length).toBe(1);
  expect(wrapper.find(".error").first().text()).toBe(
    "User does not exist."
  );
});
