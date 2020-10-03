import ApiClient from "../packs/ApiClient";
import Button from "./Button";
import Chat from "./Chat";
import { Program } from "./types";
import Output from "./Output";
import ProgramChannel from "../channels/program_channel";
import React, { useEffect, useState } from "react";
import Votes from "./Votes";

const ENTER = "Enter";

const Program = () => {
  const client = new ApiClient();
  const [channel, setChannel] = useState(null);
  const [program, setProgram] = useState({} as Program);
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

    type Data = {
      isCode: boolean;
      addition: string;
    };

    const data: Data = {
      isCode: false,
      addition: val,
    };
    if (val[0] === "!") {
      data.isCode = true;
      data.addition = val.substring(1);
    }

    channel.message(data);
    setAddition("");
  };

  const _handleClear = () => {
    channel.clear();
  };

  if (!program || !program.id) return null;
  return (
    <>
      <h1>{`${program.name} - ${program.mode}`}</h1>
      <h2>{`Time: (${String(Math.floor(program.tick / 60)).padStart(2, "0")}:${String(program.tick % 60).padStart(2, "0")})`}</h2>
      <div className="program-container">
        <div className="program-content section column">
          <Output program={program} />

          <div className="flex space-between full">
            <Button className="button button__action third" handleSubmit={_handleSubmit} value="![TAB]" name="Tab" />
            <Button className="button button__action third" handleSubmit={_handleSubmit} value="![NEW LINE]" name="New Line" />
            <Button className="button button__action third" handleSubmit={_handleClear} value={""} name="Clear" />
          </div>
        </div>

        <div className="section">
          <Votes _handleSubmit={_handleSubmit} program={program} />
        </div>

        <div className="section">
          <Chat
            _handleSubmit={_handleSubmit}
            _handleInput={_handleInput}
            _handleEnter={_handleEnter}
            program={program}
            addition={addition}
          />
        </div>
      </div>
    </>
  );
};

export default Program;
