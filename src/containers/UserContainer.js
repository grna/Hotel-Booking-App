import React from "react";
import PropTypes from "prop-types";
import { userSignUp, userLogIn } from "../redux/actions/userActions";
import { connect } from "react-redux";
import SignUp from "../components/SignUp";
import LogIn from "../components/LogIn";

const UserContainer = ({ user, userSignUp, userLogIn }) => {
  return (
    <div>
      {!user ? (
        <>
          <LogIn userLogIn={userLogIn} />
          <SignUp userSignUp={userSignUp} />
        </>
      ) : (
        <div>{user.firstName + user.lastName}</div>
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
  userSignUp: PropTypes.func,
  userLogIn: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.fromUser.user,
});

export default connect(mapStateToProps, { userSignUp, userLogIn })(
  UserContainer
);
