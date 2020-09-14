import e from "express";

class GameAlreadyStartedError extends Error {
  constructor(message = "GameAlreadyStartedError", errorCode = 300, ...params) {
    super(...params);
    this.message = message;
    this.errorCode = errorCode;
  }
}

class GameHostNotCorrectError extends Error {
  constructor(message = "GameHostNotCorrectError", errorCode = 301, ...params) {
    super(...params);
    this.message = message;
    this.errorCode = errorCode;
  }
}

class GetRestaurantCardError extends Error {
  constructor(message = "GetRestaurantCardError", errorCode = 302, ...params) {
    super(...params);
    this.message = message;
    this.errorCode = errorCode;
  }
}

class NotEnoughRestaurantCardError extends Error {
  constructor(
    message = "NotEnoughRestaurantCardError",
    errorCode = 303,
    ...params
  ) {
    super(...params);
    this.message = message;
    this.errorCode = errorCode;
  }
}

class NotEnoughGameResultError extends Error {
  constructor(
    message = "NotEnoughGameResultError",
    errorCode = 310,
    ...params
  ) {
    super(...params);
    this.message = message;
    this.errorCode = errorCode;
  }
}
export {
  GameAlreadyStartedError,
  GameHostNotCorrectError,
  GetRestaurantCardError,
  NotEnoughRestaurantCardError,
  NotEnoughGameResultError,
};
