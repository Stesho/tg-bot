import { errorsMessages } from '../../constants/messages/index.js';
import { TaskModel } from '../schemas/index.js';

const addTask = async (task) => {
  try {
    const addedTask = await TaskModel.create(task);
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

export { addTask };
