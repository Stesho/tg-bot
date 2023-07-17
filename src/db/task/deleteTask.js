import TaskSchema from '../schemas/taskSchema.js';
import errorsMessages from '../../constants/messages/errorsMessages.js';

const deleteTask = async (taskId) => {
  try {
    const deletedTask = await TaskSchema.deleteOne({
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

export default deleteTask;
