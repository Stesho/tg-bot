import { errorsMessages } from '../../constants/messages/index.js';

const handleError = (error, errorHandler) => {
  if (error.response) {
    return {
      isError: true,
      data: errorHandler(error),
    };
  } else if (error.request) {
    return {
      isError: true,
      data: errorsMessages.requestError,
    };
  }

  return {
    isError: true,
    data: errorsMessages.unknownError,
  };
};

export { handleError };
