import { TaskModel } from '../schemas/index.js';
import { errorsMessages } from '../../constants/messages/index.js';

const updateTask = async (taskId, updatedTaskFields) => {
  try {
    const updatedTask = await TaskModel.updateOne(
      {
        _id: taskId,
      },
      {
        $set: updatedTaskFields,
      },
    );
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

export { updateTask };
