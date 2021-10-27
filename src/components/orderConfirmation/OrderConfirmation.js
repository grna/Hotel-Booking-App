import React from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import Error from "../common/Error";
import Order from "../order/Order";
import "./orderConfirmation.css";

const OrderConfirmation = ({ order, errors, onModalClose }) => {
  const closeModal = () => {
    onModalClose();
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={true}
      onRequestClose={closeModal}
    >
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
                <Order order={order} />
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
