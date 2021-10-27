import {
  CLEAR_ORDER_SUCCESS,
  CREATE_ORDER_SUCCESS,
  FETCH_AVAILABLE_ROOMS_SUCCESS,
  CREATE_ORDER_FAILED,
  FETCH_USER_ORDERS_SUCESS,
  USER_LOGOUT_SUCCESS,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAILED,
} from "../ActionTypes";

const initialState = {
  availableRooms: [],
  dateFrom: "",
  dateTo: "",
  order: {},
  userOrders: [],
};

export const ordersReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_AVAILABLE_ROOMS_SUCCESS:
      return {
        ...state,
        availableRooms: action.payload.availableRooms,
        dateFrom: action.payload._dateFrom,
        dateTo: action.payload._dateTo,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        availableRooms: [],
        order: action.payload.order,
        userOrders: action.payload.userOrders,
      };
    case FETCH_USER_ORDERS_SUCESS:
      return {
        ...state,
        userOrders: action.payload,
      };
    case CLEAR_ORDER_SUCCESS:
      return {
        ...state,
        order: {},
      };
    case CREATE_ORDER_FAILED:
      return {
        ...state,
        order: action.payload.order,
      };
    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        userOrders: [],
      };
    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        userOrders: action.payload,
      };
    case DELETE_ORDER_FAILED:
      return {
        ...state,
        userOrders: action.payload,
      };
    default:
      return state;
  }
};
