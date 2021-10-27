import {
  CLEAR_ORDER,
  CREATE_ORDER_SUCCESS,
  FETCH_AVAILABLE_ROOMS_SUCCESS,
  CREATE_ORDER_FAILED,
  FETCH_USER_ORDERS_SUCESS,
  USER_LOGOUT_SUCCESS,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAILED,
} from "../ActionTypes";

export const ordersReducers = (state = {}, action) => {
  switch (action.type) {
    case FETCH_AVAILABLE_ROOMS_SUCCESS:
      return {
        availableRooms: action.payload.availableRooms,
        dateFrom: action.payload._dateFrom,
        dateTo: action.payload._dateTo,
      };
    case CREATE_ORDER_SUCCESS:
      return { order: action.payload };
    case FETCH_USER_ORDERS_SUCESS:
      return { userOrders: action.payload };
    case CLEAR_ORDER:
      return { order: null };
    case CREATE_ORDER_FAILED:
      return {
        order: action.payload.order,
      };
    case USER_LOGOUT_SUCCESS:
      return { userOrders: null };
    case DELETE_ORDER_SUCCESS:
      return {
        userOrders: action.payload,
      };
    case DELETE_ORDER_FAILED:
      return {
        userOrders: action.payload,
      };
    default:
      return state;
  }
};
