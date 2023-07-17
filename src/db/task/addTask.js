import TaskSchema from '../schemas/taskSchema.js';
import errorsMessages from '../../constants/messages/errorsMessages.js';
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
      data: errorsMessages.addTaskError,
    };
  }
};

export default addTask;
