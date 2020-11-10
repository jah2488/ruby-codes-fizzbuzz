import _ from "lodash";
import ApiClient from "../lib/client/ApiClient";
import { Program } from "../lib/types/types";
import { ProgramChannel } from "../channels/program_channel";
import React, { useEffect, useState } from "react";
import Chat from "./Shared/Chat";
import Output from "./Shared/Output";
import Time from "./Shared/Time";
import Title from "./Shared/Title";
import Votes from "./Shared/Votes";
import Controls from "./Admin/Program/Controls";
import Constants from "../lib/constants/constants";
import ConfettiGenerator from "confetti-js";
import { MaxInputMode } from "../lib/types/types";

const Program = () => {
  const client = new ApiClient();
  const [channel, setChannel] = useState(null);
  const [program, setProgram] = useState({} as Program);
  const [addition, setAddition] = useState("");
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    const id = window.location.pathname.split("/")[2];
    const url = `/programs/${id}`;

    client
      .get(url)
      .then((response) => response.json())
      .then((program) => {
        const programChannel = ProgramChannel(program, setProgram);
        setTimeout(() => {
          programChannel.fetchUserToken();
          programChannel.message({ isCode: false, addition: "" });
        }, 500);

        setProgram(program);
        setChannel(programChannel);
      });
  }, []);

  useEffect(() => {
    setConfetti(_.get(program, "settings.confetti"));
  }, [program]);


  useEffect(() => {
    if (!confetti) return;
    const confettiSettings = {
      target: 'my-canvas'
    };
    const _confetti = new ConfettiGenerator(confettiSettings);
    _confetti.render();

    return () => _confetti.clear();
  }, [confetti]);

  const _handleInput = (program) => (e) => {
    let maxInput = 0;
    switch (program.settings.max_input_mode) {
      case MaxInputMode.Char:
        maxInput = 1
        break;
      case MaxInputMode.Word:
        maxInput = 5
        break;
      case MaxInputMode.Line:
        maxInput = 11
        break;
    }
    if (e.target.value.length <= maxInput) {
      setAddition(e.target.value);
    }
  };

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
      isCode: true,
      addition: val,
    };
    if (val[0] === Constants.CODE_KEY) {
      data.isCode = false;
      data.addition = val.substring(1);
    }

    (channel as ProgramChannel).message(data);
    setAddition("");
  };

  const _handleClear = () => {
    channel.clear();
  };

  if (!program || !program.id) return null;
  return (
    <>
      <canvas className={program.settings.confetti ? "confetti-on" : "confetti-off"} id="my-canvas"></canvas>
      {program.settings.play_state === "paused" && (
        <>
          <div className="paused"></div>
          <h1>PAUSED</h1>
        </>
      )}
      <Row>
        <Title program={program} />
        <Time program={program} />
      </Row>
      <Row>
        <div className="program-container">
          <Col>
            <div className="program-content section column">
              <Output program={program} />
              <Result output={program.output}/>
            </div>
            <div className="section">
              <Votes _handleSubmit={_handleSubmit} program={program} canVote={false} />
            </div>
          </Col>
          <Col>
           <div className="section">
              <Chat
                _handleSubmit={_handleSubmit}
                _handleInput={_handleInput}
                _handleEnter={_handleEnter}
                program={program}
                addition={addition}
              />
            </div>
          </Col>
        </div>
      </Row>
    </>
  );
};

const formatCode = (code?: string): string => {
  if (!code) return "";
  const lines = code.replace("<", "&lt;").split("\n");
  return `<span class="line">${lines.join("</span><span class='line'>")}</span>`;
};

const Result = ({output}) =>(
  <div className="code-section">
    <div className="program-code">
      <h4>Output</h4>
      <pre dangerouslySetInnerHTML={{ __html: `${formatCode(output)}` }} />
    </div>
  </div>
);

const Col = ({children}) => <div className="column">{children}</div>
const Row = ({children}) => <div className="row">{children}</div>

export default Program;
