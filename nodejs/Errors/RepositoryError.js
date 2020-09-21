class ERR_USER_NOT_FOUND extends Error {
  constructor(message = "ERR_USER_NOT_FOUND", errorCode = 200, ...params) {
    super(...params);
    this.message = message;
    this.errorCode = errorCode;
  }
}

class ERR_ROOM_NOT_FOUND extends Error {
  constructor(message = "ERR_ROOM_NAME_NOT_FOUND", errorCode = 240, ...params) {
    super(...params);
    this.message = message;
    this.errorCode = errorCode;
  }
}

class ERR_ROOM_ADD_FAIL extends Error {
  constructor(message = "ERR_ROOM_EXIST_ALREADY", errorCode = 241, ...params) {
    super(...params);
    this.message = message;
    this.errorCode = errorCode;
  }
}

export { ERR_USER_NOT_FOUND, ERR_ROOM_NOT_FOUND, ERR_ROOM_ADD_FAIL };
