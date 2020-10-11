import Button from "../../components/Button";
import React from "react";

const Chat = ({ _handleSubmit, _handleInput, _handleEnter, program, addition }) => {
  return (
    <div className="chat">
      <div className="chat__section--column-reverse">
        <div className="chat__section--output">
          {program &&
            program.messages.map((message) => (
              <div key={message.id} className={`chat__output ${message.is_code ? "chat__output--code" : ""}`}>
                <img className="chat__output--avatar" src={`https://api.adorable.io/avatars/25/${message.user_id}.png`} />
                <span className="chat__output--text">{message.name}</span>
              </div>
            ))}
        </div>
      </div>
      <div className="chat__section--input">
        <input
          className="chat__field--input"
          onInput={_handleInput}
          onKeyDown={(e) => _handleEnter(e)}
          onChange={() => {}}
          placeholder="Start Coding..."
          value={`${addition}`}
        />
        <Button
          className="button chat__field--submit mb-space-sm"
          handleClick={() => _handleSubmit(addition)}
          name="Submit"
        />
      </div>
    </div>
  );
};

export default Chat;
