const SingleObject = require("./SingleObjects");
const { frontController } = require("./Controllers/index");
const ctr = require("./Controllers/index");

// 디버깅 용
SingleObject.app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

SingleObject.server.listen(3000, () => {
  console.log("listening on *:3000");
});
frontController();
