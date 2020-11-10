import Button from "../../components/Button";
import Reference from "../Admin/Program/Reference";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode } from '@fortawesome/free-solid-svg-icons'
import { parseCookies } from "../../lib/helpers/helpers"

const Chat = ({ _handleSubmit, _handleInput, _handleEnter, program, addition }) => {
  const cookies = parseCookies();
  const userToken = cookies.user_token;

  return (
    <div className="chat">
      <div className="chat__section--column-reverse">
        <div className="chat__section--output">
          {program &&
            program.messages.map(message => {
              const currentUserStyle = userToken === message.token ? "chat__output--current-user" : "chat__output--other-user";

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
          className="chat__field--input mb-space-sm"
          onInput={_handleInput(program)}
          onKeyDown={(e) => _handleEnter(e)}
          onChange={() => {}}
          placeholder="Start Coding..."
          value={`${addition}`}
          autoFocus
        />
        <Button
          className="button chat__field--submit mb-space-sm"
          handleClick={() => _handleSubmit(addition)}
          name="Send"
        />
      </div>
      <Reference />
    </div>
  );
};

export default Chat;
