import React, { useState } from "react";
import PropTypes from "prop-types";
import Loader from "react-loader-spinner";
import Select from "react-select";
import "./orderForm.css";

const OrderForm = ({ rooms, dateFrom, dateTo, createOrder }) => {
  const [numberOfAdults, setNumberOfAdults] = useState(0);
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bookedRooms, setBookedRooms] = useState([
    {
      category: "signature",
      quantity: 0,
    },
    {
      category: "deluxe",
      quantity: 0,
    },
  ]);

  const handleSelectRoom = (e, _room) => {
    let newArray = bookedRooms.map((element) =>
      element.category === _room.category
        ? {
            ...element,
            quantity: e.value,
          }
        : { ...element }
    );
    setBookedRooms(newArray);
  };

  const fillOptionsArray = (topNumber) => {
    let options = [];
    for (let i = 1; i < topNumber + 1; i++) {
      options.push({ value: i, label: i });
    }
    return options;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const order = {
      _dateFrom: dateFrom,
      _dateTo: dateTo,
      _numberOfAdults: numberOfAdults,
      _numberOfChildren: numberOfChildren,
      _firstName: firstName,
      _lastName: lastName,
      _email: email,
      _phone: phone,
      _bookedRooms: bookedRooms,
    };
    console.log(order);
  };

  return (
    <div>
      {!rooms ? (
        //https://www.npmjs.com/package/react-loader-spinner
        <Loader
          type="TailSpin"
          color="#00BFFF"
          height={100}
          width={100}
        />
      ) : (
        <form className="order-form" onSubmit={handleFormSubmit}>
          <input
            type="date"
            name={"dateFrom"}
            value={dateFrom}
            disabled={true}
            hidden
          ></input>
          <input
            type="date"
            name={"dateTo"}
            value={dateTo}
            disabled={true}
            hidden
          ></input>
          {rooms.map((room) => {
            return (
              <div className="order-room row" key={room._id}>
                <h4>{room.title}</h4>
                <img src={room.image} alt={room.title}></img>
                <div className="inline">
                  <label>{"Number of rooms: "}</label>
                  <Select
                    name={room.category}
                    options={fillOptionsArray(room.numbers.length)}
                    onChange={(e) => handleSelectRoom(e, room)}
                  />
                  <label>
                    {" /"}
                    {room.numbers.length}
                  </label>
                </div>
              </div>
            );
          })}
          <div className="inline row">
            <label>Number of adults:</label>
            <Select
              name="numberOfAdults"
              options={fillOptionsArray(10)}
              onChange={(e) => {
                setNumberOfAdults(e.value);
              }}
            ></Select>
          </div>
          <div className="inline row">
            <label>Number of children:</label>
            <Select
              name="numberOfChildren"
              options={fillOptionsArray(10)}
              onChange={(e) => {
                setNumberOfChildren(e.value);
              }}
            ></Select>
          </div>
          <div className="row multi-line">
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            ></input>
          </div>

          <div className="row multi-line">
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            ></input>
          </div>
          <div className="row multi-line">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </div>
          <div className="row multi-line">
            <label>Phone:</label>
            <input
              type="phone"
              name="phone"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            ></input>
          </div>
          <input
            type="submit"
            value="Proceed"
            className="btn btn-lg"
          ></input>
        </form>
      )}
    </div>
  );
};

OrderForm.propTypes = {
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
  dateFrom: PropTypes.string,
  dateTo: PropTypes.string,
  createOrder: PropTypes.func,
};

export default OrderForm;
