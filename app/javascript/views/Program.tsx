import _ from "lodash";
import ApiClient from "../lib/client/ApiClient";
import { Program } from "../lib/types/types";
import { ProgramChannel } from "../channels/program_channel";
import { parseCookies } from "../lib/helpers/helpers";
import Filter from "../lib/helpers/filter";
import React, { useEffect, useState } from "react";
import Row from "../components/Row";
import Col from "../components/Col";
import Chat from "./Shared/Chat";
import Editor from "./Shared/Editor";
import Output from "./Shared/Output";
import Title from "./Shared/Title";
import Constants from "../lib/constants/constants";
import ConfettiGenerator from "confetti-js";
import Votes from "./Shared/Votes";

const Program = () => {
  const client = new ApiClient();
  const [channel, setChannel] = useState(null);
  const [program, setProgram] = useState({} as Program);
  const [addition, setAddition] = useState("");
  const [error, setError] = useState("");
  const [confetti, setConfetti] = useState(false);
  const [debounce, setDebounce] = useState(false);

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
      max: 300,
      size: 0.8,
    };
    const _confetti = new ConfettiGenerator(confettiSettings);
    _confetti.render();

    return () => _confetti.clear();
  }, [confetti]);

  const _handleInput = (program) => (e) => {
    if (
      e.target.value.length <= program.settings.max_input_mode ||
      e.target.value.substr(0, 1) === Constants.CODE_KEY ||
      Object.values(Constants.COMMANDS).join("").includes(e.target.value)

    ) {
      setError("");
    } else {
      setError("Too many characters");
    }

    const value = e.target.value.replace(/['`]/, "\"")

    setAddition(value);
  };

  const _handleEnter = (e) => {
    if (e.key === Constants.ENTER && !debounce) {
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

    setDebounce(true)
    setTimeout(() => {
      setDebounce(false)
    }, program.settings.debounce_interval * 1000);

    (channel as ProgramChannel).message(data);
    setAddition("");
    document.getElementById("chatFieldInput").focus();
  };

  if (!program || !program.id || !program.mode || !program.settings) return null;
  return (
    <>
      <canvas className={program.settings.confetti ? "confetti-on" : "confetti-off"} id="my-canvas"></canvas>
      {program.settings.play_state === "paused" && (
        <>
          <div className="paused"></div>
        </>
      )}
      <Row className="header">
        <Title program={program} />
      </Row>
      <Row className="program-container">
        <Col className="output-content section column">
          <Editor program={program} output={program.output} />
          <Output output={program.output} />
        </Col>
        {program.mode.toLowerCase() !== Constants.ANARCHY && (
          <Votes _handleSubmit={_handleSubmit} program={program} canVote={program.settings.can_vote} />
        )}
        <Col className="chat-sidebar">
          <Chat
            _handleSubmit={_handleSubmit}
            _handleInput={_handleInput}
            _handleEnter={_handleEnter}
            _handleInvisibilityToggle={_handleInvisibilityToggle}
            program={program}
            addition={addition}
            debounce={debounce}
            error={error}
            userToken={userToken}
          />
        </Col>
      </Row>
    </>
  );
};

export default Program;
