import React from "react";
import PropTypes from "prop-types";
import { userSignUp, userLogIn } from "../redux/actions/userActions";
import { connect } from "react-redux";
import SignUp from "../components/SignUp";
import LogIn from "../components/LogIn";
import Order from "../components/Order";

const UserContainer = ({
  user,
  userOrders,
  userSignUp,
  userLogIn,
}) => {
  return (
    <div>
      {!user && (
        <>
          <LogIn userLogIn={userLogIn} />
          <SignUp userSignUp={userSignUp} />
        </>
      )}
      {userOrders && (
        <div>
          <p>{`Welcome ${user.firstName} ${user.lastName}`}</p>
          <h4>Here are your orders:</h4>
          {userOrders.map((order) => (
            <Order key={order._id} order={order} />
          ))}
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
  userSignUp: PropTypes.func,
  userLogIn: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.fromUser.user,
  userOrders: state.fromOrders.userOrders,
});

export default connect(mapStateToProps, { userSignUp, userLogIn })(
  UserContainer
);
