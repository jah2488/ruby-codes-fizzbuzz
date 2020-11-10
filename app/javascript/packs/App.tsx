import React from "react";
import ReactDOM from "react-dom";
import Program from "../views/Program";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<Program />, document.querySelector('.main-container').appendChild(document.createElement("div"))
  );
});
