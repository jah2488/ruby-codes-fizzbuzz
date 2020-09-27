import React from "react";

const Button = ({ className = "", handleSubmit, value, name }) => (
  <div className={className}>
    <input type="button" onClick={() => handleSubmit(value)} value={name} />
  </div>
);

export default Button;
