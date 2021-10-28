import React from "react";
import SignUp from "./SignUp";
import { mount } from "enzyme";

function renderSignUpForm(args) {
  const defaultProps = {
    errors: {},
    userSignUp: () => {},
  };

  const props = { ...defaultProps, ...args };
  return mount(<SignUp {...props}></SignUp>);
}

it("renders form", () => {
  const wrapper = renderSignUpForm();
  expect(wrapper.find("form").length).toBe(1);
});

it("validates input fields", () => {
  const args = {
    errors: {
      count: 6,
      firstName: "First name is mandatory!",
      lastName: "Last name is mandatory!",
      email: "Invalid email address!",
      password: "Password must contain UPPER & numeric values!",
      confirm: "Password does not match!",
      userSignUpFailed: "User already exists.",
    },
  };

  const wrapper = renderSignUpForm(args);
  expect(wrapper.find(".error").length).toBe(6);
  expect(wrapper.find(".error").first().text()).toBe(
    "First name is mandatory!"
  );
  expect(wrapper.find(".error").at(1).text()).toBe(
    "Last name is mandatory!"
  );
  expect(wrapper.find(".error").at(2).text()).toBe(
    "Invalid email address!"
  );
  expect(wrapper.find(".error").at(3).text()).toBe(
    "Password must contain UPPER & numeric values!"
  );
  expect(wrapper.find(".error").at(4).text()).toBe(
    "Password does not match!"
  );
  expect(wrapper.find(".error").at(5).text()).toBe(
    "User already exists."
  );
});
