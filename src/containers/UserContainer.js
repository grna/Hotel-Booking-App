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
import OrderList from "../components/orderList/OrderList";

const UserContainer = ({
  user,
  userOrders,
  errors,
  userSignUp,
  userLogIn,
  userLogOut,
  deleteUserOrder,
}) => {
  return (
    <div>
      {Object.keys(user).length === 0 ? (
        <>
          <LogIn errors={errors} userLogIn={userLogIn} />
          <p>- or -</p>
          <SignUp errors={errors} userSignUp={userSignUp} />
        </>
      ) : (
        <>
          <OrderList
            user={user}
            userOrders={userOrders}
            errors={errors}
            deleteUserOrder={deleteUserOrder}
            userLogOut={userLogOut}
          />
        </>
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
