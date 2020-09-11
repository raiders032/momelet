export default class SocketResponse {
  constructor() {
    this.success = false;
    this.errorCode = "message is not published";
    this.data = null;
  }
  setSuccess(success) {
    this.success = success;
    return this;
  }

  setErrorCode(errorCode) {
    this.errorCode = errorCode;
    return this;
  }

  setData(key, value) {
    this.data[key] = value;
    return this;
  }

  isOk(data) {
    this.success = true;
    this.errorCode = null;
    this.data = data;
    return this;
  }

  isFail(errorCode) {
    this.success = false;
    this.errorCode = errorCode;
    this.data = null;
    return this;
  }
}
