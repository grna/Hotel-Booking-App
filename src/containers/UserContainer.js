import React from "react";
import PropTypes from "prop-types";
import {
  userSignUp,
  userLogIn,
  userLogOut,
} from "../redux/actions/userActions";
import { deleteUserOrder } from "../redux/actions/ordersActions";
import { connect } from "react-redux";
import SignUp from "../components/signup/SignUp";
import LogIn from "../components/login/LogIn";
import Order from "../components/order/Order";
import Error from "../components/common/Error";

const UserContainer = ({
  user,
  userOrders,
  errors,
  userSignUp,
  userLogIn,
  userLogOut,
  deleteUserOrder,
}) => {
  const onDeleteOrderClick = (e, orderId) => {
    e.preventDefault();
    deleteUserOrder(orderId);
  };

  const onLogOutClick = () => {
    userLogOut();
  };

  return (
    <div>
      {!user && (
        <>
          <LogIn errors={errors} userLogIn={userLogIn} />
          <p>- or -</p>
          <SignUp errors={errors} userSignUp={userSignUp} />
        </>
      )}
      {userOrders && (
        <div className="user-orders">
          <p>{`Welcome ${user.firstName} ${user.lastName}`}</p>
          <h4>Here are your orders:</h4>
          {errors.fetchUserOrdersFailed ? (
            <Error text={errors.fetchUserOrdersFailed} />
          ) : userOrders.length === 0 ? (
            <p>You have no outstanding orders</p>
          ) : (
            userOrders.map((order) => (
              <div key={order._id}>
                <Order order={order} />
                <button
                  className="btn btn-lg"
                  onClick={(e) => onDeleteOrderClick(e, order._id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
          <button
            className="btn btn-lg"
            onClick={() => {
              onLogOutClick();
            }}
          >
            LogOut
          </button>
        </div>
      )}
    </div>
  );
};

UserContainer.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    token: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
  }),
  userOrders: PropTypes.array,
  errors: PropTypes.object,
  userSignUp: PropTypes.func,
  userLogIn: PropTypes.func,
  userLogOut: PropTypes.func,
  deleteUserOrder: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.fromUser.user,
  userOrders: state.fromOrders.userOrders,
  errors: state.fromErrors.errors,
});

export default connect(mapStateToProps, {
  userSignUp,
  userLogIn,
  userLogOut,
  deleteUserOrder,
})(UserContainer);
