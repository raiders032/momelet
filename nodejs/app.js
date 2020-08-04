const ctr = require("./Controllers/index");
const singleObject = require("./singleObjects");
const { frontController } = require("./Controllers/index");

// 디버깅 용
singleObject.app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

frontController();

singleObject.server.listen(3000, () => {
  console.log("listening on *:3000");
});
