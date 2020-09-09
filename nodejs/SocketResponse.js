export default class SocketResponse {
  constructor(success, errorCode, data) {
    this.success = success;
    this.errorCode = errorCode;
    this.data = data;
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
