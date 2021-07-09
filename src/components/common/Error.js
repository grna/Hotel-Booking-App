import React from "react";
import PropTypes from "prop-types";

const Error = ({ text }) => {
  return <span className="error">{text}</span>;
};

Error.propTypes = {
  text: PropTypes.string,
};

export default Error;
