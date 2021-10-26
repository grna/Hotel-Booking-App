import {
  CREATE_ORDER,
  SEARCH_AVAILABLE_ROOMS,
  CLEAR_ORDER,
  FETCH_USER_ORDERS_SUCESS,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAILED,
} from "../ActionTypes";
import {
  createOrderFailed,
  validateOrderForm,
  validateSearchForm,
} from "./errorsActions";

export const deleteUserOrder =
  (orderId) => async (dispatch, getState) => {
    await fetch(`http://localhost:3001/api/orders/${orderId}`, {
      method: "DELETE",
    }).then((res) => {
      const userOrders = getState().fromOrders.userOrders;

      if (!res.ok) {
        dispatch({
          type: DELETE_ORDER_FAILED,
          payload: userOrders,
        });
        return;
      }

      const newOrderArray = userOrders.slice().filter((order) => {
        return order._id !== orderId;
      });
      dispatch({
        type: DELETE_ORDER_SUCCESS,
        payload: newOrderArray,
      });
    });
  };

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
      })
      .catch((error) => dispatch(createOrderFailed(order, error)));
  }
};

export const fetchUserOrders = (email) => async (dispatch) => {
  await fetch(`http://localhost:3001/api/orders/${email}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: FETCH_USER_ORDERS_SUCESS,
        payload: data,
      });
    })
    .catch((error) => console.log(error));
};

export const clearOrder = () => (dispatch) => {
  dispatch({ type: CLEAR_ORDER });
};
