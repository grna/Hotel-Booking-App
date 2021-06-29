import { CREATE_ORDER, SEARCH_AVAILABLE_ROOMS } from "../ActionTypes";

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
    default:
      return state;
  }
};
