import { SEARCH_AVAILABLE_ROOMS } from "../ActionTypes";

export const ordersReducers = (state = {}, action) => {
  switch (action.type) {
    case SEARCH_AVAILABLE_ROOMS:
      // Get orders on specified date, check which rooms are booked,
      // return list of available rooms
      return { orders: action.payload };
    default:
      return state;
  }
};
