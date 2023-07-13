import TaskSchema from '../../schemas/taskSchema.js';

const addTask = async (task) => {
  try {
    await TaskSchema.create(task);
  } catch (error) {
    console.log(error);
  }
};

export default addTask;
