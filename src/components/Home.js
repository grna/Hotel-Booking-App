import React from "react";
import PropTypes from "prop-types";
import "./home.css";

const Home = ({ onDateSearch }) => {
  return (
    <div className="home">
      <img src="../static/images/facade.jpg" alt="facade.jpg"></img>
      <form onSubmit={onDateSearch}>
        <label>
          From:
          <input
            className="input-date"
            type="date"
            name="dateFrom"
          ></input>
        </label>

        <label>
          To:
          <input
            className="input-date"
            type="date"
            name="dateTo"
          ></input>
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
  onDateSearch: PropTypes.func,
};

export default Home;
