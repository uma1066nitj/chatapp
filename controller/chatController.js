const chatService = require("../services/chatService");

exports.handleSocketConnection = (socket) => {
  console.log(`New socket connection: ${socket.id}`);

  socket.on("chatMessage", (data) => {
    console.log(`Received message from ${socket.id}: ${data.message}`);

    chatService.broadcastMessage(data.message);
  });

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
};
