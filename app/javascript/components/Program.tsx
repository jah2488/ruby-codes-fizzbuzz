import ApiClient from "../packs/ApiClient";
import ProgramChannel from "../channels/program_channel";
import Button from "./Button";
import Chat from "./Chat";
import React, { useEffect, useState } from "react";
import Votes from "./Votes";
import { IProgram } from "./types";

const ENTER = "Enter";

const Program = () => {
  const client = new ApiClient();
  const [channel, setChannel] = useState(null);
  const [program, setProgram] = useState({} as IProgram);
  const [addition, setAddition] = useState("");

  useEffect(() => {
    const id = window.location.pathname.split("/")[2];
    const url = `/programs/${id}`;

    client
      .get(url)
      .then((response) => response.json())
      .then((program) => {
        setChannel(ProgramChannel(program.id, setProgram));
        setProgram(program);
      });
  }, []);

  const _handleInput = (e) => setAddition(e.target.value);

  const _handleEnter = (e) => {
    if (e.key === ENTER) {
      _handleSubmit(addition);
    }
  };

  const _handleSubmit = (val) => {
    if (val === "") return;
    const data = { addition: val };

    channel.message(data);
    setAddition("");
  };

  const _handleClear = () => {
    const url = `/programs/${program.id}/clear`;
    const data = {};

    client
      .put(url, data)
      .then((response) => response.json())
      .then((response) => setProgram(response));
  };

  if (!program.id) return null;
  return (
    <>
      <h1>{`${program.name} - ${program.mode}`}</h1>
      <div className="program-container">
        <div className="program-content column">
          <div className="code-section">
            <div className="program-code">
              <div dangerouslySetInnerHTML={{ __html: `${program.code} []` }} />
            </div>

            <div className="addition-field">
              <input
                onInput={_handleInput}
                onKeyDown={(e) => _handleEnter(e)}
                onChange={() => {}}
                placeholder="Start Coding..."
                value={addition}
              />
              <Button className="mb-space-sm" handleSubmit={_handleSubmit} value={addition} name="Submit" />
            </div>
          </div>

          <Button className="mb-space-sm" handleSubmit={_handleSubmit} value={"&nbsp;&nbsp;"} name="Tab" />
          <Button className="mb-space-sm" handleSubmit={_handleSubmit} value={"<br />"} name="New Line" />
          <Button className="mb-space-sm" handleSubmit={_handleClear} value={""} name="Clear" />
        </div>

        <Votes _handleSubmit={_handleSubmit} program={program} />
        <Chat
          _handleSubmit={_handleSubmit}
          _handleInput={_handleInput}
          _handleEnter={_handleEnter}
          program={program}
          addition={addition}
        />
      </div>
    </>
  );
};

export default Program;
