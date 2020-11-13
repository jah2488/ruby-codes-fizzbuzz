import React from "react";
import Section from "../../components/Section";
import Button from "../../components/Button";

const RestartControlsSection = ({ channel }) => {
  return (
    <Section name="Restart Controls">
      <Button handleClick={channel.clear} name="Clear Progress" />
      <Button handleClick={channel.reset} name="Restart" />
    </Section>
  )
};

export default RestartControlsSection;