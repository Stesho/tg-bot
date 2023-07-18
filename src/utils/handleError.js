import { textMessages } from '../constants/messages/index.js';

const handleError = (error, errorHandler) => {
  if (error.response) {
    return {
      isError: true,
      data: errorHandler(error),
    };
  } else if (error.request) {
    return {
      isError: true,
      data: textMessages.requestError,
    };
  }

  return {
    isError: true,
    data: textMessages.unknownError,
  };
};

export { handleError };
