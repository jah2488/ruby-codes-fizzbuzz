import _ from "lodash";
import ApiClient from "../lib/client/ApiClient";
import { Program } from "../lib/types/types";
import { ProgramChannel } from "../channels/program_channel";
import { parseCookies } from "../lib/helpers/helpers";
import Filter from "../lib/helpers/filter";
import React, { useEffect, useState } from "react";
import Chat from "./Shared/Chat";
import Output from "./Shared/Output";
import Title from "./Shared/Title";
import Constants from "../lib/constants/constants";
import ConfettiGenerator from "confetti-js";

const Program = () => {
  const client = new ApiClient();
  const [channel, setChannel] = useState(null);
  const [program, setProgram] = useState({} as Program);
  const [addition, setAddition] = useState("");
  const [error, setError] = useState("");
  const [confetti, setConfetti] = useState(false);

  const cookies = parseCookies();
  const userToken = cookies.user_token;

  useEffect(() => {
    const id = window.location.pathname.split("/")[2];
    const url = `/programs/${id}`;

    client
      .get(url)
      .then((response) => response.json())
      .then((program) => {
        const programChannel = ProgramChannel(program, setProgram);
        setTimeout(() => {
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
      target: "my-canvas",
    };
    const _confetti = new ConfettiGenerator(confettiSettings);
    _confetti.render();

    return () => _confetti.clear();
  }, [confetti]);

  const _handleInput = (program) => (e) => {
    if (e.target.value.length <= program.settings.max_input_mode || e.target.value.substr(0, 1) === Constants.CODE_KEY) {
      setError("");
    } else {
      setError("Too many characters");
    }
    setAddition(e.target.value);
  };

  const _handleEnter = (e) => {
    if (e.key === Constants.ENTER) {
      _handleSubmit(addition);
    }
  };

  const _handleInvisibilityToggle = (on: boolean) => {
    if (on) {
      setProgram({ ...program, ...{ settings: { ...program.settings, show_invisibles: true } } });
    } else {
      setProgram({ ...program, ...{ settings: { ...program.settings, show_invisibles: false } } });
    }
  };

  const _handleSubmit = (val) => {
    if (val === "") return;

    if (Object.values(Constants.COMMANDS).includes(val) == false && val[0] !== Constants.CODE_KEY) {
      if (val.length > program.settings.max_input_mode) {
        setError("This message is too long");
        return;
      }
      if (new Filter().isProfane(val)) {
        setError("Message includes inappropriate language");
        return;
      }
    } else {
      if (new Filter().isProfane(val.substring(1))) {
        setError("Message includes inappropriate language");
        return;
      }
    }

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

  if (!program || !program.id) return null;
  return (
    <>
      <canvas className={program.settings.confetti ? "confetti-on" : "confetti-off"} id="my-canvas"></canvas>
      {program.settings.play_state === "paused" && (
        <>
          <div className="paused">
            <h1>PAUSED</h1>
          </div>
        </>
      )}
      <Row className="header">
        <Title program={program} />
      </Row>
      <Row>
        <div className="program-container">
          <Col>
            <div className="program-content section column">
              <Output program={program} output={program.output} />
              <Result output={program.output} />
            </div>
          </Col>
        </div>
      </Row>
      <Col>
        <div className="sidebar">
          <Chat
            _handleSubmit={_handleSubmit}
            _handleInput={_handleInput}
            _handleEnter={_handleEnter}
            _handleInvisibilityToggle={_handleInvisibilityToggle}
            program={program}
            addition={addition}
            error={error}
            userToken={userToken}
          />
        </div>
      </Col>
    </>
  );
};

const formatCode = (output): string => {
  if (!output) return "";
  if (!output.raw) return "";
  const lines = output.raw.replace("<", "&lt;").split("\n");
  return `<span class="line">${lines.join("</span><span class='line'>")}</span>`;
};

const Result = ({ output }): JSX.Element => (
  <div className="code-section output">
    <div className="program-code">
      <pre dangerouslySetInnerHTML={{ __html: `${formatCode(output)}` }} />
    </div>
  </div>
);

const Col = ({ children }) => <div className="column">{children}</div>;
const Row = ({ className = "", children }) => <div className={"row " + className}>{children}</div>;

export default Program;
