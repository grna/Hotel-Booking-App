import {
  CREATE_ORDER_SUCCESS,
  FETCH_AVAILABLE_ROOMS_SUCCESS,
  CLEAR_ORDER_SUCCESS,
  FETCH_USER_ORDERS_SUCESS,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAILED,
} from "../ActionTypes";
import {
  createOrderFailed,
  validateOrderForm,
  validateSearchForm,
  fetchUserOrdersFailed,
} from "./errorsActions";

export const deleteUserOrder =
  (orderId) => async (dispatch, getState) => {
    const res = await fetch(
      `http://localhost:3001/api/orders/${orderId}`,
      { method: "DELETE" }
    );
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

    if (!valid) {
      return;
    }

    const res = await fetch(
      `http://localhost:3001/api/orders?from=${_dateFrom}&to=${_dateTo}`
    );
    const orders = await res.json();
    const availableRooms = rooms.map((room) => ({
      ...room,
      quantity: getAvailableCount(room, orders),
    }));

    dispatch({
      type: FETCH_AVAILABLE_ROOMS_SUCCESS,
      payload: { availableRooms, _dateFrom, _dateTo },
    });
  };

export const createOrder =
  (orderForm) => async (dispatch, getState) => {
    const valid = await dispatch(validateOrderForm(orderForm));

    if (!valid) {
      return;
    }

    const res = await fetch("http://localhost:3001/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderForm),
    });

    if (!res.ok) {
      const error = res.text();
      dispatch(createOrderFailed(order, error));
    }

    const order = await res.json();
    const userOrders = getState().fromOrders.userOrders;
    const newArray = [order, ...userOrders];
    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: { order: order, userOrders: newArray },
    });
  };

export const fetchUserOrders = (email) => async (dispatch) => {
  const res = await fetch(
    `http://localhost:3001/api/orders/${email}`,
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    dispatch(fetchUserOrdersFailed());
    return;
  }

  const userOrders = await res.json();

  dispatch({
    type: FETCH_USER_ORDERS_SUCESS,
    payload: userOrders,
  });
};

export const clearOrder = () => (dispatch) => {
  dispatch({ type: CLEAR_ORDER_SUCCESS });
};
