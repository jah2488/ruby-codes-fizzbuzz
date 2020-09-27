import consumer from "./consumer";

export default (program_id, setProgram) => {
  const sub = consumer.subscriptions.create(
    { channel: "ProgramChannel", id: program_id },
    {
      connected() {
        console.log("Connected to Program Channel(" + program_id + ")"); // Called when the subscription is ready for use on the server
      },

      disconnected() {
        console.log("disconnected"); // Called when the subscription has been terminated by the server
      },

      received(data) {
        console.log(`Data:`, data); // Called when there's incoming data on the websocket for this channel
        setProgram(data);
      },
    }
  );
  return {
    message: (msg) => {
      sub.perform("message", msg);
    },
  };
};
