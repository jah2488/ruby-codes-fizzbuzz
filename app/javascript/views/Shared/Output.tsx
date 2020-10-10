import React from "react";

const Output = ({ program: { code, tick }, program }) => (
  <div className="code-section">
    <div className="program-code">
      <pre
        dangerouslySetInnerHTML={{
          __html: `${formatCode(code)}${tick % 2 === 0 ? "│" : "&nbsp;"}&nbsp;</span>`,
        }}
      />
    </div>
  </div>
);

const formatCode = (code?: string): string => {
  if (!code) return "";
  const lines = code.split("\n").map((line) =>
    line
      .replace(" def ", "<span class='identifier'> def </span>")
      .replace(/( end[ \n]*)/, "<span class='identifier'>$1</span>")
      .replace(" exit", "<span class='identifier'> exit </span>")
      .replace(" if ", "<span class='identifier'> if </span>")
      .replace(" else ", "<span class='identifier'> else </span>")
      .replace(" elsif ", "<span class='identifier'> elsif </span>")
      .replace(" case ", "<span class='identifier'> case </span>")
      .replace(" when ", "<span class='identifier'> when </span>")
      .replace(/( puts[\( \n]*)/, "<span class='operator'>$1</span>")
      .replace(/( [0-9]+ )/, "<span class='operator'> $1 </span>")
      .replace(/[</span> ]+(:[a-zA-Z_]+[a-zA-Z0-9_\-]+[ \n]*)/, " <span class='symbol'>$1</span>")
  );

  return `<span class="line">${lines.join("</span><span class='line'>")}`;
};

export default Output;
