class ERR_GAME_ALREADY_STARTED extends Error {
  constructor(
    message = "ERR_GAME_ALREADY_STARTED",
    errorCode = 300,
    ...params
  ) {
    super(...params);
    this.message = message;
    this.errorCode = errorCode;
  }
}

class ERR_HOST_NOT_CORRECT extends Error {
  constructor(message = "ERR_HOST_NOT_CORRECT", errorCode = 301, ...params) {
    super(...params);
    this.message = message;
    this.errorCode = errorCode;
  }
}

class ERR_RESTAURANT_GET_FAILED extends Error {
  constructor(
    message = "ERR_RESTAURANT_GET_FAILED",
    errorCode = 302,
    ...params
  ) {
    super(...params);
    this.message = message;
    this.errorCode = errorCode;
  }
}

class ERR_NOT_ENOUGH_RESTAURANT_CARD extends Error {
  constructor(
    message = "ERR_NOT_ENOUGH_RESTAURANT_CARD",
    errorCode = 303,
    ...params
  ) {
    super(...params);
    this.message = message;
    this.errorCode = errorCode;
  }
}

class ERR_NOT_ENOUGH_GAME_RESULT extends Error {
  constructor(
    message = "ERR_NOT_ENOUGH_GAME_RESULT",
    errorCode = 310,
    ...params
  ) {
    super(...params);
    this.message = message;
    this.errorCode = errorCode;
  }
}
export {
  ERR_GAME_ALREADY_STARTED,
  ERR_HOST_NOT_CORRECT,
  ERR_RESTAURANT_GET_FAILED,
  ERR_NOT_ENOUGH_RESTAURANT_CARD,
  ERR_NOT_ENOUGH_GAME_RESULT,
};
