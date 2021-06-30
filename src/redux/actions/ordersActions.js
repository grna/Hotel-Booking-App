import { CREATE_ORDER, SEARCH_AVAILABLE_ROOMS } from "../ActionTypes";

export const searchAvailableRooms =
  (rooms, _dateFrom, _dateTo) => async (dispatch) => {
    debugger;
    const res = await fetch(
      `http://localhost:3001/api/orders?from=${_dateFrom}&to=${_dateTo}`
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
        payload: { availableRooms, _dateFrom, _dateTo },
      });
    }, 1000);
  };

export const createOrder = (order) => async (dispatch) => {
  await fetch("http://localhost:3001/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: CREATE_ORDER,
        payload: data,
      });
    });
};
