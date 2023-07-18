import { TaskModel } from '../schemas/index.js';
import { errorsMessages } from '../../constants/messages/index.js';

const getTasksByTime = async (time) => {
  try {
    const tasks = await TaskModel.find({
      notificationTime: time,
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

export { getTasksByTime };
