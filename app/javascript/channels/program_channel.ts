import consumer from "./consumer";

export default (program_id: number, setProgram) => {
  const sub = consumer.subscriptions.create(
    { channel: "ProgramChannel", id: program_id },
    {
      connected() {
        console.debug("Connected to Program Channel(" + program_id + ")");
      },

      disconnected() {
        console.debug("disconnected");
        setProgram({});
      },

      received({ action, data }) {
        switch (action) {
          case "tick":
            console.debug("tick");
            setProgram(data);
            break;

          default:
            console.log(`Data:`, data);
            setProgram(data);
            break;
        }
      },
    }
  );
  return {
    message: (msg: string) => {
      sub.perform("message", msg);
    },
    clear: () => {
      sub.perform("clear");
    }
  };
};
