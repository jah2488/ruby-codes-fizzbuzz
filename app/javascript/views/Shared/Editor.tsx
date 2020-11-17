import React from "react";
import hljs from "highlight.js";
import ruby from "highlight.js/lib/languages/ruby";
import "highlight.js/styles/github.css";
hljs.registerLanguage("ruby", ruby);
hljs.configure({
  tabReplace: "  ",
});

const Output = ({ program: { code }, program, output }) => (
  <div className="code-section source">
    <div className="program-code scrollable">
      <pre
        dangerouslySetInnerHTML={{
          __html: formatCode(
            code,
            output,
            program.settings.show_invisibles
          ),
        }}
      />
    </div>
  </div>
);

const formatCode = (code: string, output: { raw: string; err_ln: number }, showInvisibles: boolean): string => {
  const MAX_START_LINES = 20;
  const textCursor = `<span class='text-cursor'></span>&nbsp;</span>`;
  let lines = [];
  let remainderLines = [];

  if (showInvisibles) {
    lines = code.replace(/ /g, "<span class='space'>·</span>").split("\n");
  } else {
    const highlighted_code = hljs.highlight("ruby", code).value;
    lines = highlighted_code.split("\n");
  }

  for (let i = 0; i < MAX_START_LINES - lines.length; i++) {
    remainderLines.push(`<span class='line'></span>`)
  }

  if (code === "") return (
    `<span class='line present-line'>` +
    textCursor +
    remainderLines.join("")
  );
  
  const presentLine = lines.pop();
  const allLines = lines
    .map((line, index) => {
      if (index === lines.length - 1) {
        return `${line}<span class='newline'>${showInvisibles ? "⏎" : ""}</span></span>`;
      }

      return `${line}<span class='newline'>${showInvisibles ? "⏎" : ""}</span></span><span class='line ${
        Number(output?.err_ln) === Number(index + 2) ? "error-line" : ""
      }'>`;
    })
    .join("");

  const errorOnFirstLine = Number(output?.err_ln) === 1;
  const errorOnPresentLine = Number(output?.err_ln) === Number(lines.length + 1);

  return (
    (allLines ? `<span class="line ${errorOnFirstLine ? "error-line" : ""}">${allLines}` : "") +
    `<span class="line present-line ${errorOnPresentLine ? "error-line" : ""}">${presentLine}` +
    textCursor +
    remainderLines.join("")
  );
};

export default Output;
