// Run this example by adding <%= javascript_pack_tag 'App_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>App React</div> at the bottom
// of the page.

import React from "react";
import ReactDOM from "react-dom";
import Program from "../components/Program";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<Program />, document.body.appendChild(document.createElement("div"))
  );
});
