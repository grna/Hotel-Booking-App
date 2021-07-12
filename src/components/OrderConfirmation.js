import React from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { formatCurrency } from "../tools/formatCurrency";
import moment from "moment";
import "./orderConfirmation.css";
import Error from "../components/common/Error";

const OrderConfirmation = ({ order, errors, onModalClose }) => {
  const rooms = JSON.parse(order.rooms);

  const closeModal = () => {
    onModalClose();
  };

  return (
    <Modal isOpen={true} onRequestClose={closeModal}>
      <Zoom>
        {
          <div id="orderConfirmation" className="order-confirmation">
            <button className="close-modal" onClick={closeModal}>
              x
            </button>
            {errors.count > 0 ? (
              <Error text={errors.orderFailed}></Error>
            ) : (
              <>
                <h3>Thank you for choosing us.</h3>
                <p>Here are your reservation details:</p>
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
                <button className="btn btn-lg" onClick={closeModal}>
                  Close
                </button>
              </>
            )}
          </div>
        }
      </Zoom>
    </Modal>
  );
};

OrderConfirmation.propTypes = {
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
  errors: PropTypes.object,
  onModalClose: PropTypes.func,
};

export default OrderConfirmation;
