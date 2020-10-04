import React from "react";

const Time = ({ program }) => <h2>{`Time: (${tickAsTime(program.tick)})`}</h2>;

const tickAsTime = (tick: number): string => [leftPad(Math.floor(tick / 60)), ":", leftPad(tick % 60)].join("");

const leftPad = (number: number): string => String(number).padStart(2, "0");

export default Time;