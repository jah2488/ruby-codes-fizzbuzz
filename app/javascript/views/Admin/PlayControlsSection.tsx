import React from "react";
import Section from "../../components/Section";
import Button from "../../components/Button";
import { ProgramChannel } from "../../channels/program_channel";

const PlayControlsSection = ({ channel, program }) => {
  return (
    <Section name={`Play Controls: (${program.settings.play_state || "playing"})`}>
      <PlayControls channel={channel} current={program.settings.play_state as PlayState} />
    </Section>
  )
};

interface PlayControlProps {
  current: PlayState;
  channel: ProgramChannel;
}
type PlayState = "created" | "playing" | "paused";
const PlayControls = ({ channel, current }: PlayControlProps) => {
  switch (current) {
    case "created":
      return <button onClick={channel.resume}>Start</button>;
    case "paused":
      return <button onClick={channel.resume}>Resume</button>;
    case "playing":
    default:
      return <button onClick={channel.pause}>Pause</button>;
  }
};

export default PlayControlsSection;