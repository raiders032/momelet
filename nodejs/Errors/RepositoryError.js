class UserNotFoundByIdError extends Error {
  constructor(message = "UserNotFoundByIdError", errorCode = 200, ...params) {
    super(...params);
    this.message = message;
    this.errorCode = errorCode;
  }
}

class UserNotFoundBySocketIdError extends Error {
  constructor(
    message = "UserNotFoundBySocketIdError",
    errorCode = 201,
    ...params
  ) {
    super(...params);
    this.message = message;
    this.errorCode = errorCode;
  }
}

class RoomNotFoundByRoomNameError extends Error {
  constructor(
    message = "RoomNotFoundByRoomNameError",
    errorCode = 210,
    ...params
  ) {
    super(...params);
    this.message = message;
    this.errorCode = errorCode;
  }
}
class RoomNotExistError extends Error {
  constructor(message = "RoomNotExistError", errorCode = 211, ...params) {
    super(...params);
    this.message = message;
    this.errorCode = errorCode;
  }
}
class RoomAlreadyExistError extends Error {
  constructor(message = "RoomAlreadyExistError", errorCode = 212, ...params) {
    super(...params);
    this.message = message;
    this.errorCode = errorCode;
  }
}

export {
  UserNotFoundByIdError,
  UserNotFoundBySocketIdError,
  RoomNotFoundByRoomNameError,
  RoomNotExistError,
  RoomAlreadyExistError,
};
