import Button from "../../components/Button";
import Reference from "../Admin/Program/Reference";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faUsers,
  faEye,
  faEyeSlash,
  faKeyboard,
  faUserPlus,
  faVoteYea,
} from "@fortawesome/free-solid-svg-icons";
import Constants from "../../lib/constants/constants";

const Chat = ({
  _handleSubmit,
  _handleInput,
  _handleEnter,
  _handleInvisibilityToggle,
  program,
  addition,
  error,
  userToken,
}) => {
  const isMessage = addition.substr(0, 1) === Constants.CODE_KEY;
  const remainingCharacters = Math.min(
    Math.max(program.settings.max_input_mode - addition.length, 0),
    program.settings.max_input_mode
  );

  return (
    <div className="chat">
      <div className={"chat__toolbar " + program.mode.toLowerCase()}>
        <span className="clickable">
          {program.settings.show_invisibles ? (
            <FontAwesomeIcon size="sm" border icon={faEye} onClick={() => _handleInvisibilityToggle(false)} />
          ) : (
            <FontAwesomeIcon size="sm" border icon={faEyeSlash} onClick={() => _handleInvisibilityToggle(true)} />
          )}
        </span>
        <span>
          {program.mode.toLowerCase() === Constants.ANARCHY ? (
            <>
              <span> ANARCHY</span>
              <FontAwesomeIcon size="sm" icon={faUserPlus} />
            </>
          ) : (
            <>
              <span> DEMOCRACY</span>
              <FontAwesomeIcon size="sm" icon={faVoteYea} />
            </>
          )}
        </span>
        <span>
          <span>{program.settings.max_input_mode}</span>
          <FontAwesomeIcon size="sm" icon={faKeyboard} />
        </span>
        <span>
          <span>{program.settings.user_count}</span> <FontAwesomeIcon size="sm" icon={faUsers} />
        </span>
      </div>
      <div className="chat__section--column-reverse">
        <div className="chat__section--output">
          {program &&
            program.messages.map((message) => {
              const currentUserStyle =
                userToken === message.token ? "chat__output--current-user" : "chat__output--other-user";

              if (message.is_code) {
                return (
                  <div
                    key={message.id}
                    style={{ backgroundColor: message.color }}
                    className={`chat__output chat__output--code ${currentUserStyle}`}
                  >
                    <FontAwesomeIcon size="xs" icon={faCode} />
                    <span className="chat__output--text">{message.name}</span>
                  </div>
                );
              } else {
                return (
                  <div
                    key={message.id}
                    style={{ backgroundColor: message.color }}
                    className={`chat__output ${currentUserStyle}`}
                  >
                    <span className="chat__output--text">{message.name}</span>
                  </div>
                );
              }
            })}
        </div>
      </div>
      <div className="chat__section--input">
        <small>{error}</small>
        <div className="chat__field--input-wrapper">
          <span className={error ? " with-error" : ""}>{!isMessage ? remainingCharacters : "∞"}</span>
          <input
            className={"chat__field--input " + (error ? " with-error" : "")}
            id="chatFieldInput"
            onInput={_handleInput(program)}
            onKeyDown={(e) => _handleEnter(e)}
            onChange={() => {}}
            placeholder="Start Coding..."
            value={`${addition}`}
            autoFocus
            autoComplete="off"
          />
          <Button
            className="button chat__field--submit mb-space-sm"
            handleClick={() => _handleSubmit(addition)}
            name="Send"
          />
        </div>
        <div className="chat__field--submit-wrapper">
          <Reference _handleSubmit={_handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
