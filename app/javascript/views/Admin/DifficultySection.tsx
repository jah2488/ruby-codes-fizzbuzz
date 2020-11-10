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
          handleClick={() => channel.setMaxInputMode(MaxInputMode.Char)}
          disabled={program.settings.max_input_mode == MaxInputMode.Char}
          name="Character (1)"
        />
        <Button
          handleClick={() => channel.setMaxInputMode(MaxInputMode.Word)}
          disabled={program.settings.max_input_mode == MaxInputMode.Word}
          name="Word (4)"
        />
        <Button
          handleClick={() => channel.setMaxInputMode(MaxInputMode.Line)}
          disabled={program.settings.max_input_mode == MaxInputMode.Line}
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