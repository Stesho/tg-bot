import TaskSchema from '../schemas/taskSchema.js';
import messages from '../../constants/messages/messages.js';

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
      data: messages.getAllTasksError,
    };
  }
};

export default getAllTasks;
