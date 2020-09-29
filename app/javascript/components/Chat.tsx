import Button from "./Button";
import React from "react";

const Chat = ({ _handleSubmit, _handleInput, _handleEnter, program, addition }) => {
  return (
    <div className="chat">
      <div className="chat__section--output">
        {program && program.chat.map((message, i) => (
          <div key={i}>
            {message.user_id}: {message.name}
          </div>
        ))}
      </div>
      <div className="chat__section--input">
        <input
          className="chat__field--input"
          onInput={_handleInput}
          onKeyDown={(e) => _handleEnter(e)}
          onChange={() => { }}
          placeholder="Start Coding..."
          value={addition}
        />
        <Button className="chat__field--submit mb-space-sm" handleSubmit={_handleSubmit} value={addition} name="Submit" />
      </div>
    </div>
  )
};

export default Chat;