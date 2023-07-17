import TaskSchema from '../schemas/taskSchema.js';
import messages from '../../constants/messages/messages.js';

const deleteTask = async (taskId) => {
  try {
    const deletedTask = await TaskSchema.deleteOne({
      _id: taskId,
    });
    return {
      isError: false,
      data: deletedTask,
    };
  } catch (error) {
    return {
      isError: true,
      data: messages.deleteTaskError,
    };
  }
};

export default deleteTask;
