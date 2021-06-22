import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./containers/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
