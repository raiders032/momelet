class ERR_USER_ID_NOT_FOUND extends Error {
  constructor(message = "ERR_USER_ID_NOT_FOUND", errorCode = 200, ...params) {
    super(...params);
    this.message = message;
    this.errorCode = errorCode;
  }
}

class ERR_USER_SOCKET_ID_NOT_FOUND extends Error {
  constructor(
    message = "ERR_USER_SOCKET_ID_NOT_FOUND",
    errorCode = 201,
    ...params
  ) {
    super(...params);
    this.message = message;
    this.errorCode = errorCode;
  }
}

class ERR_ROOM_NAME_NOT_FOUND extends Error {
  constructor(message = "ERR_ROOM_NAME_NOT_FOUND", errorCode = 210, ...params) {
    super(...params);
    this.message = message;
    this.errorCode = errorCode;
  }
}
class ERR_ROOM_NOT_EXIST extends Error {
  constructor(message = "ERR_ROOM_NOT_EXIST", errorCode = 211, ...params) {
    super(...params);
    this.message = message;
    this.errorCode = errorCode;
  }
}
class ERR_ROOM_EXIST_ALREADY extends Error {
  constructor(message = "ERR_ROOM_EXIST_ALREADY", errorCode = 212, ...params) {
    super(...params);
    this.message = message;
    this.errorCode = errorCode;
  }
}

export {
  ERR_USER_ID_NOT_FOUND,
  ERR_USER_SOCKET_ID_NOT_FOUND,
  ERR_ROOM_NAME_NOT_FOUND,
  ERR_ROOM_NOT_EXIST,
  ERR_ROOM_EXIST_ALREADY,
};
