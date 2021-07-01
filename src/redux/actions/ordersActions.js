import {
  CREATE_ORDER,
  SEARCH_AVAILABLE_ROOMS,
  CLEAR_ORDER,
} from "../ActionTypes";
import { SIGNATURE, DELUXE } from "../../constants/roomCategories";

export const searchAvailableRooms =
  (rooms, _dateFrom, _dateTo) => async (dispatch) => {
    const res = await fetch(
      `http://localhost:3001/api/orders?from=${_dateFrom}&to=${_dateTo}`
    );
    const orders = await res.json();
    let bookedRooms = {
      signature: 0,
      deluxe: 0,
    };
    let _rooms = {};

    orders.forEach((order) => {
      _rooms = JSON.parse(order.rooms);
      bookedRooms.signature += _rooms.signature;
      bookedRooms.deluxe += _rooms.deluxe;
    });

    const availableRooms = rooms.map((room) => {
      let _quantity;
      switch (room.category) {
        case SIGNATURE:
          _quantity = room.quantity - bookedRooms.signature;
          break;
        case DELUXE:
          _quantity = room.quantity - bookedRooms.deluxe;
          break;
        default:
          break;
      }
      return { ...room, quantity: _quantity };
    });

    dispatch({
      type: SEARCH_AVAILABLE_ROOMS,
      payload: { availableRooms, _dateFrom, _dateTo },
    });
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

export const clearOrder = () => (dispatch) => {
  dispatch({ type: CLEAR_ORDER });
};
