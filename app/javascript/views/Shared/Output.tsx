import React from 'react';

const formatCode = (output): string => {
  if (!output) return "";
  if (!output.raw) return "";
  const lines = output.raw.replace("<", "&lt;").split("\n");
  return `<span class="line">${lines.join("</span><span class='line'>")}</span>`;
};

const Output = ({ output }): JSX.Element => (
  <div className="code-section output">
    <div className="program-code">
      <pre dangerouslySetInnerHTML={{ __html: `${formatCode(output)}` }} />
    </div>
  </div>
);

export default Output;