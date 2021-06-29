import React from "react";
import PropTypes from "prop-types";

const OrderConfirmation = ({ order }) => {
  return (
    <div className="order-confirmation">
      <h3>Your reservation was confirmed</h3>
      <p>Here are your reservation details</p>
      <p>
        Check-in:{order.dateFrom} / Check-out: {order.dateTo}
      </p>
    </div>
  );
};

OrderConfirmation.propTypes = {};

export default OrderConfirmation;
