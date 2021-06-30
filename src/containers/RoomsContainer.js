import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RoomsList from "../components/RoomsList";

const RoomsContainer = ({ rooms }) => {
  return <RoomsList rooms={rooms} />;
};

RoomsContainer.propTypes = {
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
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

export default connect(mapStateToProps, {})(RoomsContainer);
