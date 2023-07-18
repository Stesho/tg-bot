import { errorsMessages } from '../../constants/messages/index.js';
import { TaskModel } from '../schemas/index.js';

const deleteTask = async (taskId) => {
  try {
    const deletedTask = await TaskModel.deleteOne({
      _id: taskId,
    });
    return {
      isError: false,
      data: deletedTask,
    };
  } catch (error) {
    return {
      isError: true,
      data: errorsMessages.deleteTaskError,
    };
  }
};

export { deleteTask };
