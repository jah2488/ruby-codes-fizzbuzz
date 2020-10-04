import React from "react";
import Section from "../../components/Section";
import Button from "../../components/Button";
import Constants from "../../lib/constants/constants";

const Controls = ({ handleSubmit, handleClear }) => {
  return(
    <Section name="Mode">
      <div className="flex space-between full">
        <Button
          className="button button__action third"
          handleClick={() => handleSubmit(`${Constants.CODE_KEY}[TAB]`)}
          name="Tab"
        />
        <Button
          className="button button__action third"
          handleClick={() => handleSubmit(`${Constants.CODE_KEY}[NEW LINE]`)}
          name="New Line"
        />
        <Button
          className="button button__action third"
          handleClick={handleClear}
          name="Clear"
        />
      </div>
    </Section>
  )
};

export default Controls;