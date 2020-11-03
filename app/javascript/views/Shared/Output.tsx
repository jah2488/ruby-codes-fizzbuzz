import React from "react";
import hljs from 'highlight.js';
import ruby from 'highlight.js/lib/languages/ruby';
import 'highlight.js/styles/github.css';
hljs.registerLanguage('ruby', ruby);

const Output = ({ program: { code, tick }, program }) => (
  <div className="code-section">
    <div className="program-code">
      {/* <pre
        dangerouslySetInnerHTML={{
          __html: `${formatCode(code)}${tick % 2 === 0 ? "│" : "&nbsp;"}&nbsp;</span>`,
        }}
      /> */}
      <pre
        dangerouslySetInnerHTML={{
          __html: `${formatCode(hljs.highlight('ruby', code).value)}${tick % 2 === 0 ? "│" : "&nbsp;"}&nbsp;</span>`,
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

const customSyntaxHighlighting = (lines) => {
  return lines.map(line => 
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
      .replace(/("[^"]*")/g, "<span class='string'>$1</span>")
  )
};

export default Output;
