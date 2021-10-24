import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import About from "../components/About";
import RoomsContainer from "../containers/RoomsContainer";
import OrderContainer from "./OrderContainer";
import Login from "../components/Login";
import { connect } from "react-redux";
import { userSignUp } from "../redux/actions/userActions";
import PropTypes from "prop-types";

const App = ({ user, userSignUp }) => (
  <div className="app grid-container">
    <Header />
    <main>
      <Switch>
        <Route exact path="/" component={OrderContainer} />
        <Route path="/rooms" component={RoomsContainer} />
        <Route path="/about" component={About} />
        <Route path="/auth">
          <Login userSignUp={userSignUp}></Login>
        </Route>
        {user}
      </Switch>
    </main>
    <Footer />
  </div>
);

App.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    token: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
  }),
  userSignUp: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.fromUser.user,
});

export default connect(mapStateToProps, { userSignUp })(App);
