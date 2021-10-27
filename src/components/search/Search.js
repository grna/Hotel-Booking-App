import React from "react";
import PropTypes from "prop-types";
import "./search.css";
import moment from "moment";
import Error from "../common/Error";

const Search = ({ errors, searchAvailableRooms }) => {
  const today = moment().format("YYYY-MM-DD");
  const tomorrow = moment().add(1, "days").format("YYYY-MM-DD");

  const onFormSubmit = (e) => {
    e.preventDefault();
    searchAvailableRooms(e.target[0].value, e.target[1].value);
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
        <div className="date-wrapper">
          <div className="inline">
            <label>From:</label>
            <input
              className="input-date"
              type="date"
              name="dateFrom"
              min={today}
            ></input>
          </div>
          <div>
            {errors.from && <Error text={errors.from}></Error>}
          </div>
        </div>

        <div className="date-wrapper">
          <div className="inline">
            <label>To:</label>
            <input
              className="input-date"
              type="date"
              name="dateTo"
              min={tomorrow}
            ></input>
          </div>
          <div>{errors.to && <Error text={errors.to}></Error>}</div>
        </div>
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
  errors: PropTypes.object,
  searchAvailableRooms: PropTypes.func,
};

export default Search;
