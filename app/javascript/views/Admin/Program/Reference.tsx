import React from "react";
import Section from "../../../components/Section";
import Button from "../../../components/Button";
import Constants from "../../../lib/constants/constants";

const Reference = () => {
  const { CODE_KEY, COMMANDS } = Constants;
  const { TAB, NEW_LINE, BACKSPACE, SPACE } = COMMANDS;

  return (
    <div className="chat-reference">
      <div className="badge">
        <pre>{CODE_KEY}</pre>CHAT
      </div>
      <div className="badge">
        <pre>{TAB}</pre>TAB
      </div>
      <div className="badge">
        <pre>{SPACE}</pre>SPACE
      </div>
      <div className="badge">
        <pre>{NEW_LINE}</pre>NEW LINE
      </div>
      <div className="badge">
        <pre>{BACKSPACE}</pre>DELETE
      </div>
    </div>
  );
};

export default Reference;
