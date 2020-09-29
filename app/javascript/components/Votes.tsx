import Button from "./Button";
import React from "react";

const SPECIAL_CHAR = {
  ["&nbsp;&nbsp;"]: "[TAB]",
  ["<br />"]: "[NEW LINE]",
};

const Votes = ({ _handleSubmit, program }) => {
  return (
    <div className="vote-section">
      <h3 className="vote-title">Democracy</h3>
      <ul className="vote-list">
        {program &&
          program.chars &&
          program.chars.map((char, i) => (
            <li key={i} className="vote-item">
              {`${SPECIAL_CHAR[char.name] || char.name} - ${char.votes_count}`}
              <Button handleSubmit={_handleSubmit} value={char.name} name="Vote" />
            </li>
          ))}
      </ul>
    </div>
  )
};

export default Votes;