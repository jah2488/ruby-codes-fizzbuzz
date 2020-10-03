import ApiClient from "../packs/ApiClient";
import { ProgramChannel } from "../channels/program_channel";
import Button from "./Button";
import React, { useEffect, useState } from "react";
import { MaxInputMode } from "./types";

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
        setChannel(ProgramChannel(program, setProgram));
        setProgram(program);
      });
  }, []);

  if (!program || !program.id) return null;

  return (
    <>
      <h1>{`${program.name} - ${program.mode}`}</h1>
      <h2>{`Time: (${tickAsTime(program.tick)})`}</h2>
      <div className="program-container">
        <div className="program-content column">
          <div className="code-section">
            <div className="program-code">
              <div
                dangerouslySetInnerHTML={{
                  __html: `${program.code} ${program.tick % 2 === 0 ? "│" : "&nbsp;"}<br/>&nbsp;`,
                }}
              />
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
          <Section name="Mode">
            <button onClick={() => channel.setMode("democracy")} disabled={program.mode === "democracy" ? true : false}>
              democracy
            </button>
            <button onClick={() => channel.setMode("anarchy")} disabled={program.mode === "anarchy" ? true : false}>
              anarchy
            </button>
          </Section>
          <Section name="Difficulty">
            <label>Max Char Length</label>
            <div>
              <button
                onClick={() => channel.setMaxInputMode(MaxInputMode.Char)}
                disabled={program.settings.max_input_mode == MaxInputMode.Char}
              >
                Character
              </button>
              <button
                onClick={() => channel.setMaxInputMode(MaxInputMode.Word)}
                disabled={program.settings.max_input_mode == MaxInputMode.Word}
              >
                Word
              </button>
              <button
                onClick={() => channel.setMaxInputMode(MaxInputMode.Line)}
                disabled={program.settings.max_input_mode == MaxInputMode.Line}
              >
                Line
              </button>
            </div>
            <br />
            <label>Vote Interval</label>
            <div>
              <button onClick={() => channel.setVoteInterval(1)} disabled={program.settings.vote_interval == 1}>
                1 sec
              </button>
              <button onClick={() => channel.setVoteInterval(3)} disabled={program.settings.vote_interval == 3}>
                3 sec
              </button>
              <button onClick={() => channel.setVoteInterval(5)} disabled={program.settings.vote_interval == 5}>
                5 sec
              </button>
              <button onClick={() => channel.setVoteInterval(9)} disabled={program.settings.vote_interval == 9}>
                9 sec
              </button>
            </div>
          </Section>
          <Section name={`Play Controls: (${program.settings.play_state || "playing"})`}>
            <PlayControls channel={channel} current={program.settings.play_state as PlayState} />
          </Section>
          <Section name="Restart Controls">
            <button onClick={channel.clear}>Clear Progress</button>
            <button onClick={channel.resetTick}>Reset Timer</button>
            <button onClick={channel.reset}>Restart</button>
          </Section>
        </div>
      </div>
    </>
  );
};

const Section = ({ name, children }) => (
  <section>
    <h3>{name}</h3>
    {children}
    <hr />
  </section>
);

interface PlayControlProps {
  current: PlayState;
  channel: ProgramChannel;
}
type PlayState = "playing" | "paused";
const PlayControls = ({ channel, current }: PlayControlProps) => {
  switch (current) {
    case "paused":
      return <button onClick={channel.resume}>Resume</button>;
    case "playing":
    default:
      return <button onClick={channel.pause}>Pause</button>;
  }
};

const tickAsTime = (tick: number): string => [leftPad(Math.floor(tick / 60)), ":", leftPad(tick % 60)].join("");

const leftPad = (number: number): string => String(number).padStart(2, "0");

export default AdminProgram;
