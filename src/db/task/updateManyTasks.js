import { errorsMessages } from '@constants/messages/index.js';
import { TaskModel } from '@db/schemas/index.js';

const updateManyTasks = async (filter, updatedTaskFields) => {
  try {
    const updatedTask = await TaskModel.updateMany(filter, {
      $set: updatedTaskFields,
    });
    return {
      isError: false,
      data: updatedTask,
    };
  } catch (error) {
    return {
      isError: true,
      data: errorsMessages.updateTaskError,
    };
  }
};

export { updateManyTasks };
