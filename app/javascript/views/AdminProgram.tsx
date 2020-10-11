import ApiClient from "../lib/client/ApiClient";
import { ProgramChannel } from "../channels/program_channel";
import { Program } from "../lib/types/types";
import React, { useEffect, useState } from "react";
import ModeSection from "./Admin/ModeSection";
import DifficultySection from "./Admin/DifficultySection";
import PlayControlsSection from "./Admin/PlayControlsSection";
import RestartControlsSection from "./Admin/RestartControlsSection";
import Output from "./Shared/Output";
import Time from "./Shared/Time";
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
      <Title program={program} />
      <Time program={program} />
      <div className="program-container">
        <div className="program-content section column">
          <Output program={program} />
        </div>

        <div className="section">
          <Votes program={program} _handleSubmit={() => {}} canVote={false} />
        </div>

        <div className="admin-section section">
          <ModeSection channel={channel} program={program} />
          <DifficultySection channel={channel} program={program} />
          <PlayControlsSection channel={channel} program={program} />
          <RestartControlsSection channel={channel} />
        </div>
      </div>
    </>
  );
};

export default AdminProgram;