import React from "react";
import Constants from "../../../lib/constants/constants";

const Reference = ({ _handleSubmit }) => {
  const { CODE_KEY, COMMANDS } = Constants;
  const { TAB, NEW_LINE, BACKSPACE, SPACE } = COMMANDS;

  return (
    <div className="chat-reference">
      <div className="badge disabled">
        <pre>{CODE_KEY}</pre>CHAT
      </div>
      <div className="badge clickable" onClick={() => _handleSubmit(BACKSPACE)}>
        <pre>{BACKSPACE}</pre>DELETE
      </div>
      <div className="badge clickable" onClick={() => _handleSubmit(NEW_LINE)}>
        <pre>{NEW_LINE}</pre>NEW LINE
      </div>
      <div className="badge clickable" onClick={() => _handleSubmit(SPACE)}>
        <pre>{SPACE}</pre>SPACE
      </div>
      <div className="badge clickable" onClick={() => _handleSubmit(TAB)}>
        <pre>{TAB}</pre>TAB
      </div>
    </div>
  );
};

export default Reference;
