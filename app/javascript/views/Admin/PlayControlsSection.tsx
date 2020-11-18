import React from "react";
import Section from "../../components/Section";
import Button from "../../components/Button";
import { ProgramChannel } from "../../channels/program_channel";

const PlayControlsSection = ({ channel, program }) => {
  return (
    <Section name={`Play Controls: (${program.settings.play_state || "playing"})`}>
      <PlayControls channel={channel} current={program.settings.play_state as PlayState} />
    </Section>
  );
};

interface PlayControlProps {
  current: PlayState;
  channel: ProgramChannel;
}
type PlayState = "created" | "playing" | "paused";

const PlayControls = ({ channel, current }: PlayControlProps) => {
  switch (current) {
    case "created":
      return <Button handleClick={channel.resume} name="Start" />;
    case "paused":
      return <Button handleClick={channel.resume} name="Resume" />;
    case "playing":
    default:
      return <Button handleClick={channel.pause} name="Pause" />;
  }
};

export default PlayControlsSection;
