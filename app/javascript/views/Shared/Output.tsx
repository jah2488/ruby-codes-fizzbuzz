import React from "react";
import hljs from 'highlight.js';
import ruby from 'highlight.js/lib/languages/ruby';
import 'highlight.js/styles/github.css';
hljs.registerLanguage('ruby', ruby);

const Output = ({ program: { code, tick }, program }) => (
  <div className="code-section">
    <div className="program-code">
      <h4>Ruby Code</h4>
      <pre
        dangerouslySetInnerHTML={{
          __html: `${formatCode(hljs.highlight('ruby', code).value)}${tick % 2 === 0 ? "<span class='text-cursor'></span>" : "&nbsp;"}&nbsp;</span>`,
        }}
      />
    </div>
  </div>
);

const formatCode = (code?: string): string => {
  if (!code) return "";
  const lines = code.split("\n")
  const presentLine = lines.pop();

  return `<span class="line">${lines.join("</span><span class='line'>")}` + 
          `</span><span class='line present-line'>${presentLine}`;
};

export default Output;
