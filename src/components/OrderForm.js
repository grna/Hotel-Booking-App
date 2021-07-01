import React, { useState } from "react";
import PropTypes from "prop-types";
import Loader from "react-loader-spinner";
import "./orderForm.css";

const OrderForm = ({ rooms, dateFrom, dateTo, createOrder }) => {
  const [numberOfAdults, setNumberOfAdults] = useState(0);
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedRooms, setSelectedRooms] = useState([]);

  const populateSelectOptions = (quantity) => {
    let options = [];
    for (let i = 1; i < quantity + 1; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  const onRoomCountSelect = (e, _price) => {
    let _room;
    _room = selectedRooms.find((x) => x.category === e.target.name);
    if (_room) {
      const newArray = selectedRooms.slice();
      _room.quantity = parseInt(e.target.value);
      newArray.splice(selectedRooms.indexOf(_room), 1, _room);
      setSelectedRooms(newArray);
    } else {
      _room = {
        category: e.target.name,
        price: parseInt(_price),
        quantity: parseInt(e.target.value),
      };
      setSelectedRooms([...selectedRooms, _room]);
    }
  };

  function countTotal() {
    let total = 0;
    selectedRooms.forEach((room) => {
      total += room.price * room.quantity;
    });
    return total;
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const order = {
      dateFrom: dateFrom,
      dateTo: dateTo,
      numberOfAdults: numberOfAdults,
      numberOfChildren: numberOfChildren,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      total: countTotal(),
      rooms: JSON.stringify(selectedRooms),
    };
    createOrder(order);
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
                  <select
                    name={room.category}
                    id={room.category}
                    onChange={(e) => {
                      onRoomCountSelect(e, room.price);
                    }}
                  >
                    <option value={0}>{0}</option>
                    {populateSelectOptions(room.quantity)}
                  </select>
                  <label>
                    {" /"}
                    {room.quantity}
                  </label>
                </div>
              </div>
            );
          })}
          <div className="inline row">
            <label>Number of adults:</label>
            <select
              name="numberOfAdults"
              onChange={(e) => {
                setNumberOfAdults(e.target.value);
              }}
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </select>
          </div>
          <div className="inline row">
            <label>Number of children:</label>
            <select
              name="numberOfChildren"
              onChange={(e) => {
                setNumberOfChildren(e.target.value);
              }}
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </select>
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
      quantity: PropTypes.number,
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
