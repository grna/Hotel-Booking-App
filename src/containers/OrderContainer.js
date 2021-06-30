import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Search from "../components/Search";
import {
  searchAvailableRooms,
  createOrder,
} from "../redux/actions/ordersActions";
import OrderForm from "../components/OrderForm";
import OrderConfirmation from "../components/OrderConfirmation";

const OrderContainer = ({
  rooms,
  availableRooms,
  dateFrom,
  dateTo,
  order,
  searchAvailableRooms,
  createOrder,
}) => {
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
          createOrder={createOrder}
        />
      )}
      {/* {order && <OrderConfirmation order={order} />} */}
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
    })
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
  searchAvailableRooms: PropTypes.func.isRequired,
  createOrder: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  rooms: state.fromRooms.rooms,
  availableRooms: state.fromOrders.availableRooms,
  dateFrom: state.fromOrders.dateFrom,
  dateTo: state.fromOrders.dateTo,
  order: state.fromOrders.order,
});

export default connect(mapStateToProps, {
  searchAvailableRooms,
  createOrder,
})(OrderContainer);
