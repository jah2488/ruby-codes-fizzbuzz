import React from "react";
import Section from "../../components/Section";
import Button from "../../components/Button";
import NumberInput from "../../components/NumberInput";

const DifficultySection = ({ channel, program }) => {
  return (
    <Section name="Difficulty">
      <label>Max Char Length</label>
      <div className="flex">
        <NumberInput
          handleClick={(e) => channel.setMaxInputMode(Number(e.target.value))}
          value={program.settings.max_input_mode}
        />
      </div>
      {program.mode === "Democracy" && (
        <>
          <br />
          <label>Can Vote</label>
          <div className="flex">
            <Button handleClick={() => channel.setCanVote(true)} disabled={program.settings.can_vote} name="On" />
            <Button handleClick={() => channel.setCanVote(false)} disabled={!program.settings.can_vote} name="Off" />
          </div>
          <br />
          <label>Vote Interval</label>
          <div className="flex">
            <NumberInput
              handleClick={(e) => channel.setVoteInterval(Number(e.target.value))}
              value={program.settings.vote_interval}
            />
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
            <NumberInput
              handleClick={(e) => channel.setVoteThreshold(Number(e.target.value))}
              value={program.settings.vote_threshold}
            />
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
      )}
    </Section>
  );
};

export default DifficultySection;
