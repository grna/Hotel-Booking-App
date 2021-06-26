import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Home from "../components/Home";
import { searchAvailableRooms } from "../redux/actions/ordersActions";

const HomeContainer = ({
  rooms,
  availableRooms,
  searchAvailableRooms,
}) => {
  return (
    <div>
      <Home
        onRoomSearch={(e) => {
          e.preventDefault();
          searchAvailableRooms(
            rooms,
            e.target[0].value,
            e.target[1].value
          );
        }}
      />
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
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      dateFrom: PropTypes.string.isRequired,
      dateTo: PropTypes.string.isRequired,
      roomNumbers: PropTypes.arrayOf(PropTypes.number).isRequired,
    })
  ),
  searchAvailableRooms: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  rooms: state.fromRooms.rooms,
  orders: state.fromOrders.orders,
});

export default connect(mapStateToProps, { searchAvailableRooms })(
  HomeContainer
);
