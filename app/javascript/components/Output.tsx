import React from "react";

const Output = ({ program }) => {
  return (
    <div className="code-section">
      <div className="program-code">
        <div dangerouslySetInnerHTML={{ __html: `${program.code} []` }} />
      </div>
    </div>
  )
};

export default Output;