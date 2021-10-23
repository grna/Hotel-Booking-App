import {
  CREATE_ORDER_FAIL,
  FORM_IS_VALID,
  FORM_NOT_VALID,
} from "../ActionTypes";
import validator from "validator";
import moment from "moment";

export const createOrderFailed = (order, error) => (dispatch) => {
  let errors = {
    count: 1,
    orderFailed:
      "Oops! Something went wrong when placing your order. Please try again later.",
  };
  console.log(error);
  dispatch({ type: CREATE_ORDER_FAIL, payload: { order, errors } });
};

export const validateSearchForm =
  (dateFrom, dateTo) => async (dispatch) => {
    const today = moment().format("YYYY-MM-DD");
    const tomorrow = moment().add(1, "days").format("YYYY-MM-DD");

    let errors = {
      count: 0,
      from: "",
      to: "",
    };

    if (
      !validator.isDate(dateFrom) ||
      dateFrom < today ||
      dateFrom > dateTo
    ) {
      errors.count++;
      errors.from = "Please enter a valid date!";
    }
    if (
      !validator.isDate(dateTo) ||
      dateTo < tomorrow ||
      dateTo < dateFrom
    ) {
      errors.count++;
      errors.to = "Please enter a valid date!";
    }

    if (errors.count > 0) {
      dispatch({
        type: FORM_NOT_VALID,
        payload: errors,
      });
      return false;
    }

    dispatch({
      type: FORM_IS_VALID,
      payload: errors,
    });
    return true;
  };

export const validateOrderForm = (order) => async (dispatch) => {
  let errors = {
    count: 0,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    rooms: "",
    adults: "",
  };

  if (!order.firstName) {
    errors.count++;
    errors.firstName = "First name is mandatory!";
  }
  if (!order.lastName) {
    errors.count++;
    errors.lastName = "Last name is mandatory!";
  }
  if (
    !order.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i)
  ) {
    errors.count++;
    errors.email = "Invalid email address!";
  }
  if (!order.phone) {
    errors.count++;
    errors.phone = "Phone is mandatory!";
  }
  if (!order.phone.match(/^[+]*[0-9]*$/g)) {
    errors.count++;
    errors.phone = "Invalid phone number!";
  }
  if (order.numberOfAdults === 0) {
    errors.count++;
    errors.adults = "Has to be at least 1 adult!";
  }
  if (JSON.parse(order.rooms).length === 0) {
    errors.count++;
    errors.rooms = "Please select at least 1 room!";
  }

  if (errors.count > 0) {
    dispatch({
      type: FORM_NOT_VALID,
      payload: errors,
    });
    return false;
  }

  dispatch({
    type: FORM_IS_VALID,
    payload: errors,
  });
  return true;
};
