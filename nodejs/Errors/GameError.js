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

class ERR_GET_RESTAURANT_CARD_FAIL extends Error {
  constructor(
    message = "ERR_GET_RESTAURANT_CARD_FAIL",
    errorCode = 500,
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

class ERR_GAME_RESULT_RESTAURANT_ID_NOT_MATCH extends Error {
  constructor(
    message = "ERR_GAME_RESULT_RESTAURANT_ID_NOT_MATCH",
    errorCode = 311,
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
  ERR_GET_RESTAURANT_CARD_FAIL,
  ERR_NOT_ENOUGH_GAME_RESULT,
  ERR_GAME_RESULT_RESTAURANT_ID_NOT_MATCH,
};
