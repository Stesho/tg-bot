import TaskSchema from '../schemas/taskSchema.js';
import errorsMessages from '../../constants/messages/errorsMessages.js';

const updateTask = async (filter, updatedTaskFields) => {
  try {
    const updatedTask = await TaskSchema.updateMany(filter, {
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

export default updateTask;
