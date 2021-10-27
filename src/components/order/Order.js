import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { formatCurrency } from "../../tools/formatCurrency";
import "./order.css";

const Order = ({ order }) => {
  const rooms = JSON.parse(order.rooms);

  return (
    <div className="order-wrapper">
      <ul>
        <li>
          <span>{"Order number: "}</span>
          {order._id}
        </li>
        <li>
          <span>{"Check-in: "}</span>
          {moment(order.dateFrom).format("ll")}
        </li>
        <li>
          <span>{" Check-out: "}</span>
          {moment(order.dateTo).format("ll")}
        </li>
        <li>
          <span>{"Guests: "}</span>
          {`adults x ${order.numberOfAdults}`}{" "}
          {order.numberOfChildren > 0 &&
            ` children x ${order.numberOfChildren}`}
        </li>
        <li>
          <span>{"Rooms: "}</span>
          {rooms.map((room) => (
            <div key={room.category}>
              {`${room.category} x ${room.quantity}`}
            </div>
          ))}
        </li>
        <li>
          <span>{"Total: "}</span>
          {formatCurrency(order.total)}
        </li>
      </ul>
    </div>
  );
};

Order.propTypes = {
  order: PropTypes.shape({
    dateFrom: PropTypes.string,
    dateTo: PropTypes.string,
    numberOfAdults: PropTypes.number,
    numberOfChildren: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    total: PropTypes.number,
    rooms: PropTypes.string,
  }),
};

export default Order;
