import Button from "../../components/Button";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode } from '@fortawesome/free-solid-svg-icons'

const Chat = ({ _handleSubmit, _handleInput, _handleEnter, program, addition }) => {
  return (
    <div className="chat">
      <div className="chat__section--column-reverse">
        <div className="chat__section--output">
          {program &&
            program.messages.map(message => {
              const currentUserStyle = program.current_user_id === message.user_id ? "chat__output--current-user" : "chat__output--other-user";

              if (message.is_code) {
                return (
                  <div key={message.id} className={`chat__output chat__output--code ${currentUserStyle}`}>
                    <FontAwesomeIcon size="xs" icon={faCode} />
                    <span className="chat__output--text">{message.name}</span>
                  </div>
                )
              } else {
                return (
                  <div key={message.id} className={`chat__output ${currentUserStyle}`}>
                    <span className="chat__output--text">{message.name}</span>
                  </div>
                )
              }
              
            })
          }
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
          autoFocus
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
