import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Search from "../components/Search";
import { searchAvailableRooms } from "../redux/actions/ordersActions";
import OrderForm from "../components/OrderForm";

const OrderContainer = ({
  rooms,
  availableRooms,
  dateFrom,
  dateTo,
  searchAvailableRooms,
}) => {
  function handleFormSubmit(e) {}

  return (
    <div>
      <Search
        searchAvailableRooms={(_dateFrom, _dateTo) => {
          searchAvailableRooms(rooms, _dateFrom, _dateTo);
        }}
      />
      {availableRooms && (
        <OrderForm
          rooms={availableRooms}
          dateFrom={dateFrom}
          dateTo={dateTo}
          createOrder={handleFormSubmit()}
        />
      )}
    </div>
  );
};

OrderContainer.propTypes = {
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
  dateFrom: PropTypes.string,
  dateTo: PropTypes.string,
  searchAvailableRooms: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  rooms: state.fromRooms.rooms,
  availableRooms: state.fromOrders.availableRooms,
  dateFrom: state.fromOrders.dateFrom,
  dateTo: state.fromOrders.dateTo,
});

export default connect(mapStateToProps, { searchAvailableRooms })(
  OrderContainer
);
