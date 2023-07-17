import TaskSchema from '../schemas/taskSchema.js';
import errorsMessages from '../../constants/messages/errorsMessages.js';

const getOneTask = async (taskId) => {
  try {
    const task = await TaskSchema.findById(taskId);
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

export default getOneTask;
