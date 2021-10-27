import React from "react";
import Search from "./Search";
import { mount } from "enzyme";

function renderSearch(args) {
  const defaultProps = {
    errors: {},
    searchAvailableRooms: () => {},
  };

  const props = { ...defaultProps, ...args };
  return mount(<Search {...props}></Search>);
}

it("renders form", () => {
  const wrapper = renderSearch();
  expect(wrapper.find("form").length).toBe(1);
});

it("tests form input validation", () => {
  const args = {
    errors: {
      from: "Please enter a valid date!",
      to: "Please enter a valid date!",
    },
  };
  const wrapper = renderSearch(args);

  expect(wrapper.find(".error").length).toBe(2);
  expect(wrapper.find(".error").first().text()).toEqual(
    "Please enter a valid date!"
  );
});
