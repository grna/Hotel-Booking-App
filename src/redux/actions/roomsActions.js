import { FETCH_ROOMS } from "../ActionTypes";

export const fetchRooms = () => async (dispatch) => {
  const res = await fetch("http://localhost:3001/api/rooms");
  const data = await res.json();
  setTimeout(function () {
    dispatch({
      type: FETCH_ROOMS,
      payload: data,
    });
  }, 1000);
};
