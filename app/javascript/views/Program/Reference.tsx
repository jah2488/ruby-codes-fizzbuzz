import React from "react";
import Section from "../../components/Section";
import Button from "../../components/Button";
import Constants from "../../lib/constants/constants";

const Reference = () => {
  const { CODE_KEY, COMMANDS } = Constants;
  const { TAB, NEW_LINE, BACKSPACE } = COMMANDS;

  return (
    <Section name="Reference">
      <div className="flex space-between full">
        <div className="flex column half">
          <div>{CODE_KEY} - Chat</div>
          <div>{TAB} - Tab</div>
        </div>
        <div className="flex column half">
          <div>{NEW_LINE} - New Line</div>
          <div>{BACKSPACE} - Backspace</div>
        </div>
      </div>
    </Section>
  )
};

export default Reference;