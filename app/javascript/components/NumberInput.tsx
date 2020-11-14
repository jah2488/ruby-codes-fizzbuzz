import React from "react";
import Input from "./Input"

const NumberInput = ({ handleClick, value }) => (
  <Input type="number" className="input__number" min={0} onChange={handleClick} value={value} />
);

export default NumberInput;