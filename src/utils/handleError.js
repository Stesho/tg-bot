import messages from '../constants/messages/messages.js';

const handleError = (error, errorHandler) => {
  if (error.response) {
    return {
      isError: true,
      data: errorHandler(error),
    };
  } else if (error.request) {
    return {
      isError: true,
      data: messages.requestError,
    };
  }

  return {
    isError: true,
    data: messages.unknownError,
  };
};

export default handleError;
