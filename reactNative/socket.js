import { React } from "react";
import io from "socket.io-client";
// 여기 서는 요청에 대한 콜백 처리는 하지 않고 브로드 캐스트 메세지 수신하는 거에 대해서만 다룸.
import * as Location from "expo-location";

console.log("Socket Call");

const socket = io(
  "http://ec2-3-34-162-241.ap-northeast-2.compute.amazonaws.com:3000",
  // "http://localhost:3000",
  // "http://localhost:8002",
  {
    query: {
      id: null,
      email: null,
      JWT: null,

      name: null,
      imageUrl: null,
      latitude: 37.5,
      longitude: Platform.OS === "ios" ? 127.5 : 127.49999,
      // latitude: null,
      // longitude: null,
    },
    reconnection: false,
    autoConnect: false,
  }
);
export default socket;
