import { errorsMessages } from '#constants/messages/index.js';
import { TaskModel } from '#db/schemas/index.js';

const getOneTask = async (taskId) => {
  try {
    const task = await TaskModel.findById(taskId);
    return {
      isError: false,
      data: task,
    };
  } catch (error) {
    return {
      isError: true,
      data: errorsMessages.getOneTaskError,
    };
  }
};

export { getOneTask };
