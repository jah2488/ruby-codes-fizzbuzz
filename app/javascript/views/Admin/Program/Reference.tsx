import React from "react";
import Section from "../../../components/Section";
import Button from "../../../components/Button";
import Constants from "../../../lib/constants/constants";

const Reference = () => {
  const { CODE_KEY, COMMANDS } = Constants;
  const { TAB, NEW_LINE, BACKSPACE, SPACE } = COMMANDS;

  return (
    <div className="chat-reference">
      <h4>Special Formatting: </h4>
      <div className="flex space-between full">
        <div className="flex column half">
          <div>{CODE_KEY} - Chat</div>
          <div>{TAB} - Tab</div>
          <div>{SPACE} - Space</div>
        </div>
        <div className="flex column half">
          <div>{NEW_LINE} - New Line</div>
          <div>{BACKSPACE} - Backspace</div>
        </div>
      </div>
    </div>
  );
};

export default Reference;
