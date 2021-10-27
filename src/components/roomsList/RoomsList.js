import React from "react";
import PropTypes from "prop-types";
import Loader from "react-loader-spinner";
import Room from "../room/Room";

const RoomsList = ({ rooms }) => {
  return (
    <div className="room-list">
      {!rooms ? (
        //https://www.npmjs.com/package/react-loader-spinner
        <Loader
          type="TailSpin"
          color="#00BFFF"
          height={100}
          width={100}
        />
      ) : (
        <ul>
          {rooms.map((room) => (
            <li key={room._id}>
              <Room room={room} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

RoomsList.propTypes = {
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      numbers: PropTypes.arrayOf(PropTypes.number),
      title: PropTypes.string,
      category: PropTypes.string,
      features: PropTypes.arrayOf(PropTypes.string),
      image: PropTypes.string,
      price: PropTypes.number,
    })
  ),
};

export default RoomsList;
