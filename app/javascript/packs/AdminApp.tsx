import React from "react";
import ReactDOM from "react-dom";
import AdminProgram from "../views/AdminProgram";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<AdminProgram />, document.querySelector('.main-container').appendChild(document.createElement("div")));
});
