import React from "react";
import PropTypes from "prop-types";
import "./search.css";

const Home = ({ error, onRoomSearch }) => {
  return (
    <div className="search">
      <img src="../static/images/facade.jpg" alt="facade.jpg"></img>
      <form onSubmit={onRoomSearch}>
        <label>
          From:
          <input
            className="input-date"
            type="date"
            name="dateFrom"
          ></input>
          {error && <span className="date-error">{error}</span>}
        </label>

        <label>
          To:
          <input
            className="input-date"
            type="date"
            name="dateTo"
          ></input>
          {error && <span className="date-error">{error}</span>}
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

Home.propTypes = {
  error: PropTypes.string,
  onRoomSearch: PropTypes.func,
};

export default Home;
