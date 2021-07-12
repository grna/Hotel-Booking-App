import {
  CREATE_ORDER,
  SEARCH_AVAILABLE_ROOMS,
  CLEAR_ORDER,
} from "../ActionTypes";
import {
  createOrderFailed,
  validateOrderForm,
  validateSearchForm,
} from "./errorsActions";

const getAvailableCount = (room, orders) => {
  let count = room.quantity;
  orders.forEach((order) => {
    let orderedRooms = JSON.parse(order.rooms);
    let orderedRoom = orderedRooms.find(
      (x) => x.category === room.category
    );
    if (orderedRoom) {
      count -= orderedRoom.quantity;
    }
  });
  return count;
};

export const searchAvailableRooms =
  (rooms, _dateFrom, _dateTo) => async (dispatch) => {
    const valid = await dispatch(
      validateSearchForm(_dateFrom, _dateTo)
    );

    if (valid) {
      const res = await fetch(
        `http://localhost:3001/api/orders?from=${_dateFrom}&to=${_dateTo}`
      );
      const orders = await res.json();
      const availableRooms = rooms.map((room) => ({
        ...room,
        quantity: getAvailableCount(room, orders),
      }));

      dispatch({
        type: SEARCH_AVAILABLE_ROOMS,
        payload: { availableRooms, _dateFrom, _dateTo },
      });
    }
  };

export const createOrder = (order) => async (dispatch) => {
  const valid = await dispatch(validateOrderForm(order));

  if (valid) {
    await fetch("http://localhost:3002/api/orders", {
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
      })
      .catch(dispatch(createOrderFailed(order)));
  }
};

export const clearOrder = () => (dispatch) => {
  dispatch({ type: CLEAR_ORDER });
};
