import { Program } from "../lib/types/types";
import consumer from "./consumer";

export interface ProgramChannel {
  message: (msg: any) => void;
};

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

          case "output":
            updateProgram({ ...program, ...{ output: data } });
            break;

          default:
            updateProgram({ ...program, ...data });
            break;
        }
      },
    }
  );
  return {
    message: (msg: any) => sub.perform("message", msg),
  };
};
