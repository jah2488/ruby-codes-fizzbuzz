import ApiClient from "../lib/client/ApiClient";
import { Program } from "../lib/types/types";
import { ProgramChannel } from "../channels/program_channel";
import React, { useEffect, useState } from "react";
import Chat from "./Shared/Chat";
import Output from "./Shared/Output";
import Time from "./Shared/Time";
import Title from "./Shared/Title";
import Votes from "./Shared/Votes";
import Controls from "./Program/Controls"
import Constants from "../lib/constants/constants";

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
        setChannel(ProgramChannel(program, setProgram));
        setProgram(program);
      });
  }, []);

  const _handleInput = (e) => setAddition(e.target.value);

  const _handleEnter = (e) => {
    if (e.key === Constants.ENTER) {
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
    if (val[0] === Constants.CODE_KEY) {
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
      {program.settings.play_state === "paused" && (
        <>
          <div className="paused"></div>
          <h1>PAUSED</h1>
        </>
      )}
      <Title program={program} />
      <Time program={program} />
      <div className="program-container">
        <div className="program-content section column">
          <Output program={program} />
          <Controls handleSubmit={_handleSubmit} handleClear={_handleClear} />
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