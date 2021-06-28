import React from "react";
import PropTypes from "prop-types";
import { formatCurrency } from "../tools/formatCurrency";
import "./room.css";

const Room = ({ room }) => {
  let i = 0;
  return (
    <div>
      <div className="room">
        <img src={room.image} alt={room.title} />
        <div className="room-description">
          <h3>{room.title}</h3>
          <div>{formatCurrency(room.price)}</div>
          <div>
            Room features:
            <ul className="features-list">
              {room.features.map((x) => (
                <li key={i++}>{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

Room.propTypes = {
  room: PropTypes.shape({
    _id: PropTypes.string,
    numbers: PropTypes.arrayOf(PropTypes.number),
    title: PropTypes.string,
    category: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.string),
    image: PropTypes.string,
    price: PropTypes.number,
  }),
};

export default Room;
