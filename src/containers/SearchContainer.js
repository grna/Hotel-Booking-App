import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Search from "../components/Search";
import { searchAvailableRooms } from "../redux/actions/ordersActions";
import RoomsList from "../components/RoomsList";

const SearchContainer = ({
  rooms,
  availableRooms,
  searchAvailableRooms,
}) => {
  return (
    <div>
      <Search
        searchAvailableRooms={(dateFrom, dateTo) => {
          searchAvailableRooms(rooms, dateFrom, dateTo);
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
