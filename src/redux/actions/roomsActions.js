import { FETCH_ROOMS_SUCCESS } from "../ActionTypes";

export const fetchRooms = () => async (dispatch) => {
  const res = await fetch("http://localhost:3001/api/rooms");
  const data = await res.json();
  data.sort((a, b) => (a.price > b.price ? 1 : -1));
  dispatch({
    type: FETCH_ROOMS_SUCCESS,
    payload: data,
  });
};
