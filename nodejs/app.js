import express from "express";
import logger from "./logger.js";
import webSocket from "./socket.js";
import dotenv from "dotenv";
// require("dotenv").config();
// app.use(logger("dev"));

// 디버깅 용
// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

dotenv.config();
const app = express();
const server = app.listen(process.env.PORT, () => {
  logger.info("Server started. listening on *:3000.");
});

webSocket(server, app);
export { app, server };
