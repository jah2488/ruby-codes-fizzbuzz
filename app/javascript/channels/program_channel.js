import consumer from "./consumer";

export default (program_id) => {
  return consumer.subscriptions.create(
    { channel: "ProgramChannel", id: program_id },
    {
      connected() {
        // Called when the subscription is ready for use on the server
        console.log("connected");
      },

      disconnected() {
        // Called when the subscription has been terminated by the server
        console.log("disconnected");
      },

      received(data) {
        // Called when there's incoming data on the websocket for this channel
        console.log(`Data: ${data}`);
      },

      server_tick: function () {
        return this.perform("server_tick");
      },

      join: function () {
        return this.perform("join");
      },

      leave: function () {
        return this.perform("leave");
      },

      message: function () {
        return this.perform("message");
      },
    }
  );
};
