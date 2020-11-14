import React from "react";

const Input = ({ type = "text", className = "", onChange, value, ...props }) => (
  <input type={type} className={className} onChange={onChange} value={value} {...props} />
);

export default Input;