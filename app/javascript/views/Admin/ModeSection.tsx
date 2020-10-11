import React from "react";
import Section from "../../components/Section";
import Button from "../../components/Button";

const ModeSection = ({ channel, program }) => {
  return(
    <Section name="Mode">
      <div className="flex">
        <Button
          handleClick={() => channel.setMode("Democracy")}
          disabled={program.mode === "Democracy" ? true : false}
          name="Democracy"
        />
        <Button
          handleClick={() => channel.setMode("Anarchy")}
          disabled={program.mode === "Anarchy" ? true : false}
          name="Anarchy"
        />
      </div>
    </Section>
  )
};

export default ModeSection;