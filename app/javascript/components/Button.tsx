import React from "react";

const Button = ({ className = "", handleClick, name, disabled = false }) => (
  <div className={"button " + className}>
    <input type="button" onClick={handleClick} value={name} disabled={disabled} />
  </div>
);

export default Button;
