class ResourceNotFoundError extends Error {
  constructor(status = 404, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.status = status;
  }
}

module.exports = ResourceNotFoundError;
