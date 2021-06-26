import { SEARCH_AVAILABLE_ROOMS } from "../ActionTypes";

export const searchAvailableRooms =
  (rooms, dateFrom, dateTo) => async (dispatch) => {
    const res = await fetch(
      `http://localhost:3001/api/orders?from=${dateFrom}&to=${dateTo}`
    );
    const orders = await res.json();
    let availableRooms = rooms.slice();
    let bookedRoomNumbers = [];

    orders.forEach((order) => {
      bookedRoomNumbers = bookedRoomNumbers.concat(order.roomNumbers);
    });

    availableRooms.forEach((room) => {
      // Remove booked room numbers from numbers array
      bookedRoomNumbers.forEach((number) => {
        room.numbers.splice(room.numbers.indexOf(number), 1);
      });
    });

    // Mock 1sec delay from server
    setTimeout(function () {
      dispatch({
        type: SEARCH_AVAILABLE_ROOMS,
        payload: availableRooms,
      });
    }, 1000);
  };
