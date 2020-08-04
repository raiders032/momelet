const ctr = require("./Controllers/index");
const SingleObject = require("./SingleObjects");
const { frontController } = require("./Controllers/index");

// 디버깅 용
SingleObject.app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

frontController();

SingleObject.server.listen(3000, () => {
  console.log("listening on *:3000");
});
