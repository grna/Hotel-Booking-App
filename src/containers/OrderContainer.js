import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Search from "../components/search/Search";
import {
  searchAvailableRooms,
  createOrder,
  clearOrder,
} from "../redux/actions/ordersActions";
import OrderForm from "../components/orderForm/OrderForm";
import OrderConfirmation from "../components/orderConfirmation/OrderConfirmation";

const OrderContainer = ({
  rooms,
  availableRooms,
  dateFrom,
  dateTo,
  order,
  errors,
  searchAvailableRooms,
  createOrder,
  clearOrder,
}) => {
  return (
    <div>
      <Search
        errors={errors}
        searchAvailableRooms={(_dateFrom, _dateTo) => {
          searchAvailableRooms(rooms, _dateFrom, _dateTo);
        }}
      />
      {availableRooms && (
        <OrderForm
          rooms={availableRooms}
          dateFrom={dateFrom}
          dateTo={dateTo}
          errors={errors}
          createOrder={createOrder}
        />
      )}
      {order && (
        <OrderConfirmation
          order={order}
          errors={errors}
          onModalClose={clearOrder}
        />
      )}
    </div>
  );
};

OrderContainer.propTypes = {
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      features: PropTypes.arrayOf(PropTypes.string).isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }).isRequired
  ),
  availableRooms: PropTypes.arrayOf(
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
  dateFrom: PropTypes.string,
  dateTo: PropTypes.string,
  order: PropTypes.object,
  errors: PropTypes.object,
  searchAvailableRooms: PropTypes.func.isRequired,
  createOrder: PropTypes.func.isRequired,
  clearOrder: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  rooms: state.fromRooms.rooms,
  availableRooms: state.fromOrders.availableRooms,
  dateFrom: state.fromOrders.dateFrom,
  dateTo: state.fromOrders.dateTo,
  order: state.fromOrders.order,
  errors: state.fromErrors.errors,
});

export default connect(mapStateToProps, {
  searchAvailableRooms,
  createOrder,
  clearOrder,
})(OrderContainer);
