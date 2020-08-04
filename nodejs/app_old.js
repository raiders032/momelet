const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const http = require("http");
const session = require("express-session");
const { response } = require("express");
const request = require("request");

require("dotenv").config();

const app = express();
const server = http.createServer(app);
var io = require("socket.io")(server);
app.set("port", process.env.PORT || 8001);

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("chat message", (msg) => {
    console.log("Message : ", msg);
    io.emit("chat message", `Message From server : ${msg}`);
  });

  socket.on("position", async (msg) => {
    console.log(msg);
    var position = msg.split(" ");
    console.log("입력값 split한것 : " + position);
    const lon = position[0];
    const lat = position[1];

    console.log("lon: " + lon);
    console.log("lat: " + lat);
    socket.emit(
      "chat message",
      "프라이이이이빗- 위도: " + lat + " 경도: " + lon
    );

    const options = {
      uri:
        "http://ec2-3-34-162-241.ap-northeast-2.compute.amazonaws.com:8080/api/v1/restaurant?longitude=125.123&latitude=33.123&radius=100.0",
      qs: {
        longitude: lon,
        latitude: lat,
        radius: 100.0,
      },
    };
    request(options, (err, response, body) => {
      socket.emit("chat message", response);
      console.log(body);
      body = JSON.parse(body);
      console.log(body);
      const { dateTime } = body;
      console.log(dateTime);
      socket.emit("chat message", body);
    });

    // if(response.ok) {
    //   let json = response.json();
    //   socket.emit("chat message", "레스토랑 json 넘겨드립니다.");
    //   socket.emit("chat message", json);
    //   socket.emit("chat message", "레스토랑 json 넘겼습니다.");

    // }
    // else{
    //   socket.emit("chat message", "정보 조회 실패!!");
    // }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(app.get("port"), () => {
  console.log("listening on ", app.get("port"));
});
