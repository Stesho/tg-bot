import TaskSchema from '../schemas/taskSchema.js';
import errorsMessages from '../../constants/messages/errorsMessages.js';

const getTasksByTime = async (time) => {
  try {
    const tasks = await TaskSchema.find({
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

export default getTasksByTime;
