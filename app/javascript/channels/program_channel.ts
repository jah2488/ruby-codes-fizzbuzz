import { Program, MaxInputMode } from "../lib/types/types";
import consumer from "./consumer";

export interface ProgramChannel {
  fetchUserToken: () => void;
  message: (msg: any) => void;
  setMode: (mode: "Anarchy" | "Democracy") => void;
  setMaxInputMode: (mode: MaxInputMode) => void;
  setVoteInterval: (interval: number) => void;
  setVoteThreshold: (threshold: number) => void;
  setCanVote: (value: boolean) => void;
  setConfetti: (value: boolean) => void;
  pause: () => void;
  resume: () => void;
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
          case "set_user_token":
            document.cookie = "user_token=" + data.token
            break;

          case "tick":
            console.debug("tick");
            updateProgram({ ...program, ...data });
            break;

          case "output":
            updateProgram({ ...program, ...{ output: data } });
            break;

          default:
            console.log(`Data:`, data);
            updateProgram({ ...program, ...data });
            break;
        }
      },
    }
  );
  return {
    fetchUserToken: () => sub.perform("fetch_user_token"),
    message: (msg: any) => sub.perform("message", msg),
    setMode: (mode: "Anarchy" | "Democracy") => sub.perform("set_mode", { data: mode }),
    setMaxInputMode: (mode: MaxInputMode) => sub.perform("set_max_input_mode", { data: mode }),
    setVoteInterval: (interval: number) => sub.perform("set_vote_interval", { data: interval }),
    setVoteThreshold: (threshold: number) => sub.perform("set_vote_threshold", { data: threshold }),
    setCanVote: (value) => sub.perform("set_can_vote", { data: value }),
    setConfetti: (value) => sub.perform("set_confetti", { data: value }),
    pause: () => sub.perform("pause"),
    resume: () => sub.perform("resume"),
    clear: () => sub.perform("clear"),
    reset: () => {
      sub.perform("clear");
    },
  };
};
