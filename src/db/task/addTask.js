import TaskSchema from '../schemas/taskSchema.js';
import messages from '../../constants/messages/messages.js';

const addTask = async (task) => {
  try {
    const addedTask = await TaskSchema.create(task);
    return {
      isError: false,
      data: addedTask,
    };
  } catch (error) {
    return {
      isError: true,
      data: messages.addTaskError,
    };
  }
};

export default addTask;
