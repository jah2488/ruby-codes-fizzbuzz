import { Program, MaxInputMode } from "../lib/types/types";
import consumer from "./consumer";

export interface ProgramChannel {
  message: (msg: string) => void;
  setMode: (mode: "anarchy" | "democracy") => void;
  setMaxInputMode: (mode: MaxInputMode) => void;
  setVoteInterval: (interval: number) => void;
  pause: () => void;
  resume: () => void;
  resetTick: () => void;
  clear: () => void;
  reset: () => void;
}

export const ProgramChannel = (program: Program, setProgram: (program: Program) => void): ProgramChannel => {
  const updateProgram = (newProgram) => {
    program = newProgram;
    setProgram(program);
  };
  
  const sub = consumer.subscriptions.create(
    { channel: "ProgramChannel", id: program.id },
    {
      connected() {
        console.debug(`Connected to Program Channel(${program.id})`);
      },

      disconnected() {
        console.debug("disconnected");
        setProgram({} as Program);
      },

      received({ action, data }) {
        switch (action) {
          case "tick":
            console.debug("tick");
            updateProgram({ ...program, ...data });
            break;

          default:
            console.log(`Data:`, data);
            updateProgram(data);
            break;
        }
      },
    }
  );
  return {
    message: (msg: string) => sub.perform("message", msg),
    setMode: (mode: "anarchy" | "democracy") => sub.perform("set_mode", { data: mode }),
    setMaxInputMode: (mode: MaxInputMode) => sub.perform("set_max_input_mode", { data: mode }),
    setVoteInterval: (interval: number) => sub.perform("set_vote_interval", { data: interval }),
    pause: () => sub.perform("pause"),
    resume: () => sub.perform("resume"),
    resetTick: () => sub.perform("reset_tick"),
    clear: () => sub.perform("clear"),
    reset: () => {
      sub.perform("clear");
      sub.perform("reset_tick");
    },
  };
};
