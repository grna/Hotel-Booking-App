import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Home from "../components/Home";

const HomeContainer = ({ rooms }) => {
  return (
    <div>
      <Home />
    </div>
  );
};

HomeContainer.propTypes = {
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      numbers: PropTypes.arrayOf(PropTypes.number).isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      features: PropTypes.arrayOf(PropTypes.string).isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ),
};

const mapStateToProps = (state) => ({
  rooms: state.fromRooms.rooms,
});

export default connect(mapStateToProps, {})(HomeContainer);
