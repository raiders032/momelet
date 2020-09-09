export default class SocketResponse {
  constructor() {
    this.success = false;
    this.errorCode = "message is not published";
    this.data = null;
  }
  setSuccess(success) {
    this.success = success;
  }

  setErrorCode(errorCode) {
    this.errorCode = errorCode;
  }

  setData(key, value) {
    this.data[key] = value;
  }

  isOk(data) {
    this.success = true;
    this.errorCode = null;
    this.data = data;
  }

  isFail(errorCode) {
    this.success = false;
    this.errorCode = errorCode;
    this.data = null;
  }
}
