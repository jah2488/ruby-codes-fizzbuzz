import ApiClient from "../lib/client/ApiClient";
import { ProgramChannel } from "../channels/program_channel";
import { Program } from "../lib/types/types";
import React, { useEffect, useState } from "react";
import ModeSection from "./Admin/ModeSection";
import DifficultySection from "./Admin/DifficultySection";
import FunSection from "./Admin/FunSection";
import PlayControlsSection from "./Admin/PlayControlsSection";
import RestartControlsSection from "./Admin/RestartControlsSection";
import Row from "../components/Row";
import Col from "../components/Col";
import Output from "./Shared/Output";
import Title from "./Shared/Title";
import Votes from "./Shared/Votes";

const AdminProgram = () => {
  const client = new ApiClient();
  const [channel, setChannel] = useState(null);
  const [program, setProgram] = useState({} as Program);

  useEffect(() => {
    const id = window.location.pathname.split("/")[3];
    const url = `/programs/${id}`;

    client
      .get(url)
      .then((response) => response.json())
      .then((program) => {
        setChannel(ProgramChannel(program, setProgram));
        setProgram(program);
      });
  }, []);

  if (!program || !program.id) return null;

  return (
    <>
      <Row className="header">
        <Title program={program} />
      </Row>
      <Row>
        <div className="program-container">
          <Col>
            <div className="program-content section column">
              <Output program={program} output={program.output} />
            </div>
          </Col>
        </div>
      </Row>
      <Col>
        <div className="sidebar scrollable">
          <div className="section">
            <Votes program={program} _handleSubmit={() => {}} canVote={true} />
          </div>

          <div className="admin-section section">
            <ModeSection channel={channel} program={program} />
            <DifficultySection channel={channel} program={program} />
            <FunSection channel={channel} program={program} />
            <PlayControlsSection channel={channel} program={program} />
            <RestartControlsSection channel={channel} />
          </div>
        </div>
      </Col>
    </>
  );
};

export default AdminProgram;
