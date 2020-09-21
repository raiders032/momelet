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
    if (err.errorCode !== undefined) {
      errorMsg.errorCode = err.errorCode;
    } else {
      logger.error("Unexpected Error!!!");
    }
    logger.error(err.stack);
    return errorMsg;
  }
};

export const errorHandlerAsync = async (callback) => {
  try {
    return await callback();
  } catch (err) {
    if (err.errorCode !== undefined) {
      errorMsg.errorCode = err.errorCode;
    } else {
      logger.error("Unexpected Error!!!");
    }
    logger.error(err.stack);
    return errorMsg;
  }
};
