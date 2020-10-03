import Button from "./Button";
import React from "react";

const Votes = ({ _handleSubmit, program }) => {
  return (
    <div className="vote-section">
      <h3 className="vote-title">Democracy</h3>
      <ul className="vote-list">
        {program &&
          program.chars &&
          program.chars.map(char => (
            <li key={char.id} className="vote-item">
              {`${char.name} - ${char.votes_count}`}
              <Button className="button" handleSubmit={_handleSubmit} value={`!${char.name}`} name="Vote" />
            </li>
          ))}
      </ul>
    </div>
  )
};

export default Votes;