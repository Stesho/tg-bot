import TaskSchema from '../schemas/taskSchema.js';

const getOneTask = async (taskId) => {
  try {
    return await TaskSchema.findById(taskId);
  } catch (error) {
    console.log(error);
  }
};

export default getOneTask;
