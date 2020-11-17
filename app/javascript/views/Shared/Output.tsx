import React from "react";
import hljs from "highlight.js";
import ruby from "highlight.js/lib/languages/ruby";
import "highlight.js/styles/github.css";
hljs.registerLanguage("ruby", ruby);
hljs.configure({
  tabReplace: "  ",
});

const Output = ({ program: { code }, program, output }) => (
  <div className="code-section">
    <div className="program-code">
      <pre
        dangerouslySetInnerHTML={{
          __html: `${formatCode(
            code,
            output,
            program.settings.show_invisibles
          )}<span class='text-cursor'></span>&nbsp;</span>`,
        }}
      />
    </div>
  </div>
);

const formatCode = (code: string, output: { raw: string; err_ln: number }, showInvisibles: boolean): string => {
  if (code === "") return "";
  let lines = [];
  if (showInvisibles) {
    lines = code.replace(/ /g, "<span class='space'>·</span>").split("\n");
  } else {
    const highlighted_code = hljs.highlight("ruby", code).value;
    lines = highlighted_code.split("\n");
  }
  const presentLine = lines.pop();
  const allLines = lines
    .map((line, index) => {
      if (index === lines.length - 1) {
        return `${line}<span class='newline'>${showInvisibles ? "⏎" : ""}</span></span>`;
      }

      return `${line}<span class='newline'>${showInvisibles ? "⏎" : ""}</span></span><span class='line ${
        output?.err_ln == index + 2 ? "error-line" : ""
      }'>`;
    })
    .join("");

  return (
    `<span class="line ${output?.err_ln == 1 ? "error-line" : ""}">` +
    `${allLines}` +
    `<span class='line present-line'>${presentLine}`
  );
};

export default Output;
