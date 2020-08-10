const app = require("express")();
const logger = require("morgan");
const webSocket = require("./socket");
require("dotenv").config();

app.use(logger("dev"));

// 디버깅 용
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const server = app.listen(3000, () => {
  console.log("listening on *:3000");
});

webSocket(server, app);
module.exports.app = app;
module.exports.server = server;
