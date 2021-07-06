import React, { useState } from "react";
import PropTypes from "prop-types";
import "./search.css";
import moment from "moment";
import validator from "validator";

const Search = ({ searchAvailableRooms }) => {
  const [errorFrom, SetErrorFrom] = useState("");
  const [errorTo, SetErrorTo] = useState("");
  const today = moment().format("YYYY-MM-DD");
  const tomorrow = moment().add(1, "days").format("YYYY-MM-DD");

  // Prevent server call, validate input, pass on dates
  const onFormSubmit = (e) => {
    e.preventDefault();
    SetErrorFrom("");
    SetErrorTo("");
    let valid = true;
    let _dateFrom = moment(e.target[0].value)._i;
    let _dateTo = moment(e.target[1].value)._i;

    if (
      !validator.isDate(e.target[0].value) ||
      _dateFrom < today ||
      _dateFrom > _dateTo
    ) {
      SetErrorFrom("Please enter a valid date!");
      valid = false;
    }
    if (
      !validator.isDate(e.target[1].value) ||
      _dateTo < tomorrow ||
      _dateTo < _dateFrom
    ) {
      SetErrorTo("Please enter a valid date!");
      valid = false;
    }

    valid && searchAvailableRooms(_dateFrom, _dateTo);
  };

  return (
    <div className="search">
      <img src="../static/images/facade.jpg" alt="facade.jpg"></img>
      <h3>Please choose your visit dates:</h3>
      <form
        onSubmit={(e) => {
          onFormSubmit(e);
        }}
      >
        <label>
          From:
          <input
            className="input-date"
            type="date"
            name="dateFrom"
            min={today}
          ></input>
          {errorFrom && <span className="error">{errorFrom}</span>}
        </label>

        <label>
          To:
          <input
            className="input-date"
            type="date"
            name="dateTo"
            min={tomorrow}
          ></input>
          {errorTo && <span className="error">{errorTo}</span>}
        </label>
        <div>
          <input
            className="btn btn-xlg"
            type="submit"
            value="Search"
          ></input>
        </div>
      </form>
    </div>
  );
};

Search.propTypes = {
  searchAvailableRooms: PropTypes.func,
};

export default Search;
