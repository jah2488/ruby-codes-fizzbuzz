import React from "react";
import ReactDOM from "react-dom";
import Program from "../components/Program";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<Program />, document.body.appendChild(document.createElement("div"))
  );
});
