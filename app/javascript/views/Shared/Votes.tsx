import React from "react";

const Votes = ({ program, _handleSubmit, debounce = false, canVote = true }) => {
  return (
    <div className="vote-section">
      <ul className="vote-list">
        <h4>Choices</h4>
        <div className="info">{program.settings.vote_interval - program.tick} seconds left</div>
        {program &&
          program.chars &&
          program.chars
            .filter((char) => char.votes_count > 1)
            .map((char) => (
              <li key={char.id} className="vote-item" onClick={() => canVote && _handleSubmit(char.name)}>
                <div className={"badge full-width " + (canVote && !debounce ? "vote clickable" : "disabled")}>
                  <span>{char.votes_count} Votes</span>
                  <pre>{char.name}</pre>
                </div>
              </li>
            ))}
      </ul>
    </div>
  );
};
export default Votes;
