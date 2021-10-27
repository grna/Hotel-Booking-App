import React from "react";
import { NavLink } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <header>
      <nav>
        <NavLink to="/" exact>
          Booking App
        </NavLink>
        <ul>
          <li>
            <NavLink to="/" exact>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/rooms">Rooms</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/user">MyProfile</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
