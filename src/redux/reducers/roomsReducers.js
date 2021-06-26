import { FETCH_ROOMS } from "../ActionTypes";

export const roomsReducers = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ROOMS:
      return { rooms: action.payload, loading: false };
    default:
      return state;
  }
};
