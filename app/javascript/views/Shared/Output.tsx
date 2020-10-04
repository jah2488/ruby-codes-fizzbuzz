import React from "react";

const Output = ({ program }) => {
  return (
    <div className="code-section">
      <div className="program-code">
        <div
          dangerouslySetInnerHTML={{
            __html: `${program.code} ${program.tick % 2 === 0 ? "│" : "&nbsp;"}<br/>&nbsp;`,
          }}
        />
      </div>
    </div>
  )
};

export default Output;