import TaskSchema from '../schemas/taskSchema.js';
import messages from '../../constants/messages/messages.js';

const updateTask = async (taskId, updatedTaskFields) => {
  try {
    const updatedTask = await TaskSchema.updateOne(
      {
        _id: taskId,
      },
      {
        $set: updatedTaskFields,
      },
    );
    return {
      isError: false,
      data: updatedTask,
    };
  } catch (error) {
    return {
      isError: true,
      data: messages.updateTaskError,
    };
  }
};

export default updateTask;
