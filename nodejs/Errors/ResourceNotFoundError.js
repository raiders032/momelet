class ResourceNotFoundError extends Error {
  constructor(status = 404, ...params) {
    super(...params);

    this.status = status;
  }
}

module.exports = ResourceNotFoundError;
