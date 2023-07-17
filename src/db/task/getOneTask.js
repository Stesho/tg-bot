import TaskSchema from '../schemas/taskSchema.js';
import messages from '../../constants/messages/messages.js';

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
      data: messages.getOneTaskError,
    };
  }
};

export default getOneTask;
