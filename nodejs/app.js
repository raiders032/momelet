const app = require("express")();
//const server = require("http").createServer(app);
const logger = require("morgan");
const webSocket = require("./socket");
const userFilter = require("./Middleware/userFilter");
require("dotenv").config();

app.use(logger("dev"));
app.use(userFilter);
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
