import express from "express";
import logger from "./logger.js";
import webSocket from "./socket.js";
import dotenv from "dotenv";
// import jwtAuth from "./Middleware/jwtAuth.js";
dotenv.config();

const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(jwtAuth);

const server = app.listen(process.env.PORT, () => {
  logger.info("Server started. listening on *:3000.");
});
app.set("server", server);

webSocket(server, app);

export default app;
