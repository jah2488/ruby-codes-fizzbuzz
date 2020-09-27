import ApiClient from "../packs/ApiClient";
import Button from "./Button";
import React, { useEffect, useState } from "react";

const SPECIAL_CHAR = {
  ["&nbsp;&nbsp;"]: "[TAB]",
  ["<br />"]: "[NEW LINE]"
}

const ENTER = "Enter"

const Program = () => {
  const client = new ApiClient();
  const [program, setProgram] = useState({});
  const [addition, setAddition] = useState("");
  
  console.log(window.location);

  useEffect(() => {
    const programId = window.location.pathname.split("/")[2]
    const url = `/programs/${programId}`;

    client.get(url)
      .then(response => response.json())
      .then(response => {
        setProgram(response);
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
    const url = `/programs/${program.id}`;
    const data = { addition: val };

    client.put(url, data)
      .then(response => response.json())
      .then(response => {
        setProgram(response);
        setAddition("");
      });
  };

  const _handleClear = () => {
    const url = `/programs/${program.id}/clear`;
    const data = {};

    client.put(url, data)
      .then(response => response.json())
      .then(response => setProgram(response));
  }

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
              <input onInput={_handleInput} onKeyDown={(e) => _handleEnter(e)} onChange={() => {}} placeholder="Start Coding..." value={addition} />
              <Button className="mb-space-sm" handleSubmit={_handleSubmit} value={addition} name="Submit" />
            </div>
          </div>

          <Button className="mb-space-sm" handleSubmit={_handleSubmit} value={"&nbsp;&nbsp;"} name="Tab" />
          <Button className="mb-space-sm" handleSubmit={_handleSubmit} value={"<br />"} name="New Line" />
          <Button className="mb-space-sm" handleSubmit={_handleClear} value={""} name="Clear" />
        </div>

        <div className="vote-section">
          <h3 className="vote-title">Democracy</h3>
          <ul className="vote-list">
            {program && program.chars && program.chars.map((char, i) => (
              <li key={i} className="vote-item">
                {`${SPECIAL_CHAR[char.name] || char.name} - ${char.votes_count}`}
                <Button handleSubmit={_handleSubmit} value={char.name} name="Vote" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Program
