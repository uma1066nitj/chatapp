require("dotenv").config();

const express = require("express");
const http = require("http");
const cors = require("cors");
const chatService = require("./services/chatService");

const app = express();
const server = http.createServer(app);
chatService.initializeChatService(server);

app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use("/", require("./routes/index"));

const port = process.env.PORT || 5000;
server.listen(port, console.log(`Port running on ${port}`));
