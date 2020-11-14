import Button from "../../components/Button";
import React from "react";

const Votes = ({ program, _handleSubmit, canVote = true }) => {
  return (
    <div className="vote-section">
      <h3 className="vote-title">{program.mode.toUpperCase()}</h3>
      <h4>Max Input Length: {program.settings.max_input_mode} Char(s)</h4>
      {program && program.mode.toLowerCase() === "democracy" &&
        <>
          <h4>Vote's Needed: {program.settings.vote_threshold}</h4>
          <ul className="vote-list">
            {program && program.chars && program.chars.map(char => (
                <li key={char.id} className="vote-item">
                  {`${char.name} - ${char.votes_count}`}
                  {canVote && 
                    <Button
                      className="button"
                      handleClick={() => _handleSubmit(char.name)}
                      name="Vote"
                    />
                  }
                </li>
              ))}
          </ul>
        </>
      }
    </div>
  )
};

export default Votes;