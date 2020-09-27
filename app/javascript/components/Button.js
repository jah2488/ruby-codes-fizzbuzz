import React from "react";
import PropTypes from "prop-types";

const Button = ({ className, handleSubmit, value, name }) => (
  <div className={className}>
    <input type="button" onClick={() => handleSubmit(value)} value={name} />
  </div>
)

Button.propTypes = {
  className: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

Button.defaultValues = {
  className: ""
}

export default Button;