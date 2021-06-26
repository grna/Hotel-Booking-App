import { SEARCH_AVAILABLE_ROOMS } from "../ActionTypes";

export const searchAvailableRooms =
  (rooms, dateFrom, dateTo) => async (dispatch) => {
    debugger;
    const res = await fetch(
      `http://localhost:3001/api/orders?from=${dateFrom}&to=${dateTo}`
    );
    const orders = await res.json();
    let availableRooms = rooms.slice();
    let bookedRooms = [];

    orders.forEach((order) => {
      bookedRooms = bookedRooms.concat(order.roomNumbers);
    });

    availableRooms.forEach((room) => {
      room.numbers.forEach((number) => {
        if (bookedRooms.includes(number)) {
          room.numbers.splice(bookedRooms.indexOf(number), 1);
        }
      });
    });

    setTimeout(function () {
      dispatch({
        type: SEARCH_AVAILABLE_ROOMS,
        payload: availableRooms,
      });
    }, 1000);
  };
