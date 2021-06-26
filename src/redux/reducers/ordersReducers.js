import { SEARCH_AVAILABLE_ROOMS } from "../ActionTypes";

export const ordersReducers = (state = {}, action) => {
  switch (action.type) {
    case SEARCH_AVAILABLE_ROOMS:
      return { availableRooms: action.payload };
    default:
      return state;
  }
};
