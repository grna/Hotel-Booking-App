import React from "react";
import PropTypes from "prop-types";
import {
  userSignUp,
  userLogIn,
  userLogOut,
} from "../redux/actions/userActions";
import { connect } from "react-redux";
import SignUp from "../components/SignUp";
import LogIn from "../components/LogIn";
import Order from "../components/Order";

const UserContainer = ({
  user,
  userOrders,
  errors,
  userSignUp,
  userLogIn,
  userLogOut,
}) => {
  const onLogOutClick = () => {
    userLogOut();
  };

  return (
    <div>
      {!user && (
        <>
          <LogIn errors={errors} userLogIn={userLogIn} />
          <SignUp errors={errors} userSignUp={userSignUp} />
        </>
      )}
      {userOrders && (
        <div>
          <p>{`Welcome ${user.firstName} ${user.lastName}`}</p>
          <h4>Here are your orders:</h4>
          {userOrders.map((order) => (
            <Order key={order._id} order={order} />
          ))}
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
})(UserContainer);
