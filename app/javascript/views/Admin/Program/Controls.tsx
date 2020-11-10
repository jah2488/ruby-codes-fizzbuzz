import React from "react";
import Section from "../../../components/Section";
import Button from "../../../components/Button";
import Constants from "../../../lib/constants/constants";

const Controls = ({ handleSubmit, handleClear }) => {
  const { TAB, NEW_LINE, BACKSPACE } = Constants.COMMANDS;

  return(
    <Section name="Quick Commands">
      <div className="flex space-between full">
        <div className="flex column half">
          <Button
            className="button button__action two-thirds"
            handleClick={() => handleSubmit(TAB)}
            name="Tab"
          />
          <Button
            className="button button__action two-thirds"
            handleClick={() => handleSubmit(NEW_LINE)}
            name="New Line"
          />
        </div>
        <div className="flex column half">
          <Button
            className="button button__action two-thirds"
            handleClick={() => handleSubmit(BACKSPACE)}
            name="Backspace"
          />
          {/* <Button
            className="button button__action quarter"
            handleClick={handleClear}
            name="Clear"
          /> */}
        </div>
      </div>
    </Section>
  )
};

export default Controls;