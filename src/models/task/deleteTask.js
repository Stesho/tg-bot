import TaskSchema from '../../schemas/taskSchema.js';

const deleteTask = async (taskId) => {
  try {
    return await TaskSchema.deleteOne({
      _id: taskId,
    });
  } catch (error) {
    console.log(error);
  }
};

export default deleteTask;
