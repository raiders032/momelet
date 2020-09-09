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
    data[key] = value;
  }
}
