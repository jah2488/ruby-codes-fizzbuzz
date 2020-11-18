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
  const textCursor = `<span class='text-cursor'></span></span>`;
  let lines = [];
  let remainderLines = [];
  let inString = false;

  if (showInvisibles) {
    lines = code.replace(/ /g, "<span class='space'>·</span>").split("\n");
  } else {

    let highlighted_code = hljs.highlight("ruby", code).value;
    
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

  const formattedLines = lines.map((line, index) => {
    if (inString) {
      if (index === lines.length - 1 && line === "</span>") {
        line = "";
      }
      line = '<span class="hljs-string">' + line;
    }
    const lineCount = (line.match(/(&quot;)/g) || []).length;
    if (lineCount % 2 !== 0) {
      if (inString) {
        inString = false;
      } else {
        if (index !== lines.length - 1) {
          line = line + '</span>';
        }
        inString = true;
      }
    }
    return line;
  })
  
  const allLines = formattedLines
    .map((line, index) => {
      if (index === lines.length - 2) {
        return `${line}<span class="newline">${showInvisibles ? "⏎" : ""}</span></span><span class="line present-line">`;
      }
      
      if (index === lines.length - 1) {
        return `${line}<span class="newline">${showInvisibles ? "⏎" : ""}</span>`;
      }

      return `${line}<span class='newline ${index}'>${showInvisibles ? "⏎" : ""}</span></span><span class='line ${
        Number(output?.err_ln) === Number(index + 2) ? "error-line" : ""
      }'>`;
    })
    .join("");

  const errorOnFirstLine = Number(output?.err_ln) === 1;

  return (
    (`<span class="line ${errorOnFirstLine ? "error-line" : ""}">${allLines}`) +
    textCursor +
    remainderLines.join("")
  );
};

export default Output;
