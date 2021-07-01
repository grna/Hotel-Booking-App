import React from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";

const OrderConfirmation = ({ order, onModalClose }) => {
  const closeModal = () => {
    onModalClose();
  };

  return (
    <Modal isOpen={true} onRequestClose={closeModal}>
      <Zoom>
        <div className="order-confirmation">
          <button className="close-modal" onClick={closeModal}>
            x
          </button>
          <h3>Your order was confirmed.</h3>
          <h4>Thank you for choosing us.</h4>
          <p>Here are your reservation details:</p>
          <p>{`Order number: ${order._id}`}</p>
          <p>
            {`Check-in: ${order.dateFrom} Check-out: ${order.dateTo}`}
          </p>
          <p>
            {`Guests: adults x ${order.numberOfAdults}`}{" "}
            {order.numberOfChildren > 0 &&
              ` children x ${order.numberOfChildren}`}
          </p>
          <p>{`Rooms: ${order.rooms}`}</p>
        </div>
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
  onModalClose: PropTypes.func,
};

export default OrderConfirmation;
