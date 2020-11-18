import React from "react";
import Section from "../../components/Section";
import Button from "../../components/Button";

const FunSection = ({ channel, program }) => {
  return (
    <Section name="Confetti">
      <label>Confetti</label>
      <div className="flex">
        <Button handleClick={() => channel.setConfetti(true)} disabled={program.settings.confetti} name="On" />
        <Button handleClick={() => channel.setConfetti(false)} disabled={!program.settings.confetti} name="Off" />
      </div>
    </Section>
  );
};

export default FunSection;
