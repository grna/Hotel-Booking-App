import React from "react";
import PropTypes from "prop-types";
import Error from "../common/Error";
import Order from "../order/Order";
import "./orderList.css";

const OrderList = ({
  user,
  userOrders,
  errors,
  deleteUserOrder,
  userLogOut,
}) => {
  const onDeleteOrderClick = (e, orderId) => {
    e.preventDefault();
    deleteUserOrder(orderId);
  };

  const onLogOutClick = () => {
    userLogOut();
  };

  return (
    <div className="order-list">
      <p>{`Welcome ${user.firstName} ${user.lastName}`}</p>
      <h4>Here are your orders:</h4>
      {errors.fetchUserOrdersFailed && (
        <Error text={errors.fetchUserOrdersFailed} />
      )}
      <div>
        {userOrders.length === 0 ? (
          <p>You have no outstanding orders</p>
        ) : (
          userOrders.map((order) => (
            <div key={order._id}>
              <Order order={order} />
              <button
                className="btn btn-lg btn-danger"
                onClick={(e) => onDeleteOrderClick(e, order._id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
        <button
          className="btn btn-lg log-out-btn"
          onClick={() => {
            onLogOutClick();
          }}
        >
          LogOut
        </button>
      </div>
    </div>
  );
};

OrderList.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    token: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
  }),
  userOrders: PropTypes.array,
  errors: PropTypes.object,
  deleteUserOrder: PropTypes.func,
  userLogOut: PropTypes.func,
};

export default OrderList;
