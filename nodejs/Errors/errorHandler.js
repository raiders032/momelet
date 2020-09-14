import logger from "../logger.js";

const errorMsg = {
  success: false,
  errorCode: null,
  data: null,
};
export const errorHandler = (callback) => {
  try {
    return callback();
  } catch (err) {
    logger.error(err.stack);
    if (err.errorCode !== undefined) {
      errorMsg.errorCode = err.errorCode;
    } else {
      logger.error("Unexpected Error!!!");
    }
    return errorMsg;
  }
};

export const errorHandlerAsync = async (callback) => {
  try {
    return await callback();
  } catch (err) {
    logger.error(err.stack);
    if (err.errorCode !== undefined) {
      errorMsg.errorCode = err.errorCode;
    } else {
      logger.error("Unexpected Error!!!");
    }
    return errorMsg;
  }
};
