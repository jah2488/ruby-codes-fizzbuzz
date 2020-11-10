import React from "react";
import Section from "../../components/Section";
import Button from "../../components/Button";
import { MaxInputMode } from "../../lib/types/types";

const DifficultySection = ({ channel, program }) => {
  return(
    <Section name="Difficulty">
      <label>Max Char Length</label>
      <div className="flex">
        <Button
          handleClick={() => channel.setMaxInputMode(1)}
          disabled={program.settings.max_input_mode == 1}
          name="Character (1)"
        />
        <Button
          handleClick={() => channel.setMaxInputMode(4)}
          disabled={program.settings.max_input_mode == 4}
          name="Word (4)"
        />
        <Button
          handleClick={() => channel.setMaxInputMode(10)}
          disabled={program.settings.max_input_mode == 10}
          name="Line (10)"
        />
      </div>
      {program.mode === "Democracy" && 
        <>
          <br />
          <label>Vote Interval</label>
          <div className="flex">
            <Button
              handleClick={() => channel.setVoteInterval(1)}
              disabled={program.settings.vote_interval == 1}
              name="1 sec"
            />
            <Button
              handleClick={() => channel.setVoteInterval(3)}
              disabled={program.settings.vote_interval == 3}
              name="3 sec"
            />
            <Button
              handleClick={() => channel.setVoteInterval(5)}
              disabled={program.settings.vote_interval == 5}
              name="5 sec"
            />
            <Button
              handleClick={() => channel.setVoteInterval(9)}
              disabled={program.settings.vote_interval == 9}
              name="9 sec"
            />
          </div>
          <br />
          <label>Vote Threshold</label>
          <div className="flex">
            <Button
              handleClick={() => channel.setVoteThreshold(1)}
              disabled={program.settings.vote_threshold == 1}
              name="1 vote"
            />
            <Button
              handleClick={() => channel.setVoteThreshold(3)}
              disabled={program.settings.vote_threshold == 3}
              name="3 vote"
            />
            <Button
              handleClick={() => channel.setVoteThreshold(5)}
              disabled={program.settings.vote_threshold == 5}
              name="5 vote"
            />
            <Button
              handleClick={() => channel.setVoteThreshold(9)}
              disabled={program.settings.vote_threshold == 9}
              name="9 vote"
            />
          </div>
        </>
      }
    </Section>
  )
};

export default DifficultySection;