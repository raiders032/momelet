class ERR_UNDEFINED_TYPE extends Error {
  constructor(message = "ERR_UNDEFINED_TYPE", errorCode = 100, ...params) {
    super(...params);
    this.message = message;
    this.errorCode = errorCode;
  }
}
class ERR_WRONG_TYPE extends Error {
  constructor(message = "ERR_WRONG_TYPE", errorCode = 101, ...params) {
    super(...params);
    this.message = message;
    this.errorCode = errorCode;
  }
}

export { ERR_UNDEFINED_TYPE, ERR_WRONG_TYPE };
