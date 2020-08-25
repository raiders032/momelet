const app = require("express")();
const { logger } = require("./logger");
const webSocket = require("./socket");
require("dotenv").config();

// app.use(logger("dev"));

// 디버깅 용
// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

const server = app.listen(process.env.PORT, () => {
  logger.info("Server started. listening on *:3000.");
});

webSocket(server, app);
module.exports.app = app;
module.exports.server = server;
