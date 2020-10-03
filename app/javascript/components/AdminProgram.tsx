import ApiClient from "../packs/ApiClient";
import ProgramChannel from "../channels/program_channel";
import Button from "./Button";
import React, { useEffect, useState } from "react";

const SPECIAL_CHAR = {
  ["&nbsp;&nbsp;"]: "[TAB]",
  ["<br />"]: "[NEW LINE]",
};

const ENTER = "Enter";

type Char = {
  name: string;
  votes_count: number;
};

type Program = {
  id: string;
  code: string;
  mode: string;
  name: string;
  chars: [Char];
  tick: number;
  settings: any;
};

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
        setChannel(ProgramChannel(program.id, setProgram));
        setProgram(program);
      });
  }, []);

  if (!program || !program.id) return null;

  return (
    <>
      <h1>{`${program.name} - ${program.mode}`}</h1>
      <h2>{`Time: (${String(Math.floor(program.tick / 60)).padStart(2, "0")}:${String(program.tick % 60).padStart(2, "0")})`}</h2>
      <div className="program-container">
        <div className="program-content column">
          <div className="code-section">
            <div className="program-code">
              <div dangerouslySetInnerHTML={{ __html: `${program.code} ${program.tick % 2 === 0 ? "⎰" : "⎱"}` }} />
            </div>
          </div>
        </div>

        <div className="vote-section">
          <h3 className="vote-title">Democracy</h3>
          <ul className="vote-list">
            {program &&
              program.chars &&
              program.chars.map((char, i) => (
                <li key={i} className="vote-item">
                  {`${SPECIAL_CHAR[char.name] || char.name} - ${char.votes_count}`}
                </li>
              ))}
          </ul>
        </div>
        <div className="admin-section">
          <h3>Mode</h3>
          <button disabled={program.mode === "Democracy" ? true : false}>democracy</button>
          <button disabled={program.mode === "Anarchy" ? true : false}>anarchy</button>
        </div>
      </div>
    </>
  );
};

export default AdminProgram;