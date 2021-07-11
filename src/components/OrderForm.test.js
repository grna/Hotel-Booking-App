import React from "react";
import OrderForm from "./OrderForm";
import { mount } from "enzyme";

function renderOrderForm(args) {
  const defaultProps = {
    rooms: [],
    dateFrom: "",
    dateTo: "",
    errors: {},
    createOrder: () => {},
  };

  const props = { ...defaultProps, ...args };
  return mount(<OrderForm {...props}></OrderForm>);
}

it("renders form", () => {
  const wrapper = renderOrderForm();
  expect(wrapper.find("form").length).toBe(1);
});

it("validates input fields", () => {
  const args = {
    rooms: [
      {
        _id: "1",
        price: 1,
      },
      {
        _id: "2",
        price: 2,
      },
    ],
    errors: {
      firstName: "First name is mandatory!",
      lastName: "Last name is mandatory!",
      email: "Invalid email address!",
      phone: "Phone is mandatory!",
      rooms: "Please select at least 1 room!",
      adults: "Has to be at least 1 adult!",
    },
  };
  const wrapper = renderOrderForm(args);
  expect(wrapper.find(".error").length).toBe(7);
  expect(wrapper.find(".order-room .error").first().text()).toBe(
    "Please select at least 1 room!"
  );
  expect(wrapper.find(".guest-count .error").first().text()).toBe(
    "Has to be at least 1 adult!"
  );
});
