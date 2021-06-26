import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Search from "../components/Search";
import { searchAvailableRooms } from "../redux/actions/ordersActions";
import RoomsList from "../components/RoomsList";
import validator from "validator";

const SearchContainer = ({
  rooms,
  availableRooms,
  searchAvailableRooms,
}) => {
  const [error, SetError] = useState("");

  const validateInput = (e) => {
    if (
      !validator.isDate(e.target[0].value, {
        format: "YYYY-MM-DD",
      }) ||
      !validator.isDate(e.target[1].value, {
        format: "YYYY-MM-DD",
      }) ||
      new Date(e.target[0].value) < new Date()
    ) {
      SetError("Please enter a valid date!");
      return false;
    }
    SetError("");
    return true;
  };

  return (
    <div>
      <Search
        error={error}
        onRoomSearch={(e) => {
          e.preventDefault();
          if (validateInput(e)) {
            searchAvailableRooms(
              rooms,
              e.target[0].value,
              e.target[1].value
            );
          }
        }}
      />
      {availableRooms && <RoomsList rooms={availableRooms} />}
    </div>
  );
};

SearchContainer.propTypes = {
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
  availableRooms: PropTypes.arrayOf(
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
  searchAvailableRooms: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  rooms: state.fromRooms.rooms,
  availableRooms: state.fromOrders.availableRooms,
});

export default connect(mapStateToProps, { searchAvailableRooms })(
  SearchContainer
);
