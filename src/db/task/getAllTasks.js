import { errorsMessages } from '../../constants/messages/index.js';
import { TaskModel } from '../schemas/index.js';

const getAllTasks = async (userId) => {
  try {
    const tasks = await TaskModel.find({
      userId,
    });
    return {
      isError: false,
      data: tasks,
    };
  } catch (error) {
    return {
      isError: true,
      data: errorsMessages.getAllTasksError,
    };
  }
};

export { getAllTasks };
