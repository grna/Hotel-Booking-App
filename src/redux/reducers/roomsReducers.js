import { FETCH_ROOMS } from "../ActionTypes";

export const roomsReducers = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ROOMS:
      return { rooms: action.payload };
    default:
      return state;
  }
};
