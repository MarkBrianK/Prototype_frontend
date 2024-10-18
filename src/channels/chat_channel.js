// app/javascript/channels/chat_channel.js
import consumer from "./consumer";

const createChatChannel = (userId, onReceived) => {
  return consumer.subscriptions.create("ChatChannel", {
    connected() {
    },

    disconnected() {

    },

    received(data) {
      onReceived(data);
    },

    speak(message) {
      this.perform('speak', { message: message, user_id: userId });
    }
  });
};

export default createChatChannel;
