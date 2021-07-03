import React, { useState } from "react";
import PropTypes from "prop-types";
import Loader from "react-loader-spinner";
import "./orderForm.css";
import { formatCurrency } from "../tools/formatCurrency";

const OrderForm = ({ rooms, dateFrom, dateTo, createOrder }) => {
  const [numberOfAdults, setNumberOfAdults] = useState(0);
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [errors, setErrors] = useState({
    count: 0,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    rooms: "",
    adults: "",
  });

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
    let selectedRoom;
    selectedRoom = selectedRooms.find(
      (x) => x.category === e.target.name
    );
    if (selectedRoom) {
      const newArray = selectedRooms.slice();
      selectedRoom.quantity = parseInt(e.target.value);
      newArray.splice(
        selectedRooms.indexOf(selectedRoom),
        1,
        selectedRoom
      );
      setSelectedRooms(newArray);
    } else {
      selectedRoom = {
        category: e.target.name,
        price: parseInt(_price),
        quantity: parseInt(e.target.value),
      };
      setSelectedRooms([...selectedRooms, selectedRoom]);
    }
  };

  function countTotal() {
    let total = 0;
    selectedRooms.forEach((room) => {
      total += room.price * room.quantity;
    });
    return total;
  }

  const formIsValid = (e) => {
    !e.target["firstName"].value &&
      setErrors((errors) => ({
        ...errors,
        firstName: "First name is mandatory!",
        count: errors.count++,
      }));
    !e.target["lastName"].value &&
      setErrors((errors) => ({
        ...errors,
        lastName: "Last name is mandatory!",
        count: errors.count++,
      }));
    !e.target["email"].value &&
      setErrors((errors) => ({
        ...errors,
        email: "Email is mandatory!",
        count: errors.count++,
      }));
    !e.target["email"].value.match(
      "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i"
    ) &&
      setErrors((errors) => ({
        ...errors,
        email: "Invalid email address!",
        count: errors.count++,
      }));
    !e.target["phone"].value &&
      setErrors((errors) => ({
        ...errors,
        phone: "Phone is mandatory!",
        count: errors.count++,
      }));
    !e.target["phone"].value.match("/^[+]*[0-9]*$/g") &&
      setErrors((errors) => ({
        ...errors,
        phone: "Invalid phone number!",
        count: errors.count++,
      }));
    e.target["numberOfAdults"].value === "0" &&
      setErrors((errors) => ({
        ...errors,
        adults: "Has to be at least 1 adult!",
        count: errors.count++,
      }));
    selectedRooms.length === 0 &&
      setErrors((errors) => ({
        ...errors,
        rooms: "Please select at least 1 room!",
        count: errors.count++,
      }));

    if (errors.count > 0) {
      return false;
    }
    return true;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formIsValid(e)) {
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
    }
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
                <span>{formatCurrency(room.price)}</span>
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
                <span className="error">{errors.rooms}</span>
              </div>
            );
          })}
          <div className="row">
            <div className="inline">
              <label>Number of adults:</label>
              <select
                name="numberOfAdults"
                onChange={(e) => {
                  setNumberOfAdults(e.target.value);
                }}
              >
                <option key={0} value={0}>
                  {0}
                </option>
                {populateSelectOptions(10)}
              </select>
            </div>
            <span className="error">{errors.adults}</span>
          </div>
          <div className="inline row">
            <label>Number of children:</label>
            <select
              name="numberOfChildren"
              onChange={(e) => {
                setNumberOfChildren(e.target.value);
              }}
            >
              <option key={0} value={0}>
                {0}
              </option>
              {populateSelectOptions(10)}
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
            <span className="error">{errors.firstName}</span>
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
            <span className="error">{errors.lastName}</span>
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
            <span className="error">{errors.email}</span>
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
            <span className="error">{errors.phone}</span>
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
