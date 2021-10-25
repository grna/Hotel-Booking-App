import {
  CLEAR_ORDER,
  CREATE_ORDER,
  SEARCH_AVAILABLE_ROOMS,
  CREATE_ORDER_FAIL,
  FETCH_USER_ORDERS_SUCESS,
  USER_LOGOUT_SUCCESS,
} from "../ActionTypes";

export const ordersReducers = (state = {}, action) => {
  switch (action.type) {
    case SEARCH_AVAILABLE_ROOMS:
      return {
        availableRooms: action.payload.availableRooms,
        dateFrom: action.payload._dateFrom,
        dateTo: action.payload._dateTo,
      };
    case CREATE_ORDER:
      return { order: action.payload };
    case FETCH_USER_ORDERS_SUCESS:
      return { userOrders: action.payload };
    case CLEAR_ORDER:
      return { order: null };
    case CREATE_ORDER_FAIL:
      return {
        order: action.payload.order,
      };
    case USER_LOGOUT_SUCCESS:
      return { userOrders: null };
    default:
      return state;
  }
};
