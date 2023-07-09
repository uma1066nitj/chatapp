const socketIO = require("socket.io");
const chatController = require("../controller/chatController");

exports.initializeChatService = (server) => {
  const io = socketIO(server);

  io.on("connection", (socket) => {
    chatController.handleSocketConnection(socket);
  });

  console.log("Chat service initialized");
};

exports.broadcastMessage = (message) => {
  io.emit("chatMessage", { message });
};
