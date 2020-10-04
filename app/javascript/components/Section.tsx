import React from "react";

const Section = ({ name, children }) => (
  <section>
    <h3>{name}</h3>
    {children}
    <hr />
  </section>
);

export default Section;
