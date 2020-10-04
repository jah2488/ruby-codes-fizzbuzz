import React from "react";
import Section from "../../components/Section";
import Button from "../../components/Button";

const ModeSection = ({ channel, program }) => {
  return(
    <Section name="Mode">
      <div className="flex">
        <Button
          handleClick={() => channel.setMode("democracy")}
          disabled={program.mode === "democracy" ? true : false}
          name="democracy"
        />
        <Button
          handleClick={() => channel.setMode("anarchy")}
          disabled={program.mode === "anarchy" ? true : false}
          name="anarchy"
        />
      </div>
    </Section>
  )
};

export default ModeSection;