class UndefinedTypeError extends Error {
  constructor(message = "UndefinedTypeError", errorCode = 100, ...params) {
    super(...params);
    this.message = message;
    this.errorCode = errorCode;
  }
}
class WrongTypeError extends Error {
  constructor(message = "WrongTypeError", errorCode = 101, ...params) {
    super(...params);
    this.message = message;
    this.errorCode = errorCode;
  }
}

export { UndefinedTypeError, WrongTypeError };
