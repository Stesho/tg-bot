import TaskSchema from '../schemas/taskSchema.js';
import errorsMessages from '../../constants/messages/errorsMessages.js';

const getAllTasks = async (userId) => {
  try {
    const tasks = await TaskSchema.find({
      user_id: userId,
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

export default getAllTasks;
