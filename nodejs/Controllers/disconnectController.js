import logger from "../logger.js";
import { disconnectingService, disconnectService } from "../Services/index.js";

export default (socket, errorHandler) => {
  // 연결이 끊어지려 하지만 방은 아직 안나감
  socket.on("disconnecting", (reason) => {
    // logger.info("disconnecting. reason: " + reason);
    errorHandler(() => {
      disconnectingService(socket, reason);
    });
  });

  // 연결 해제
  socket.on("disconnect", () => {
    errorHandler(() => {
      disconnectService(socket);
    });
  });
};
