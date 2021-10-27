import { FETCH_ROOMS_SUCCESS } from "../ActionTypes";

export const roomsReducers = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ROOMS_SUCCESS:
      return { rooms: action.payload };
    default:
      return state;
  }
};
