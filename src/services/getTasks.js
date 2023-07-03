import TaskSchema from '../schemas/taskSchema.js';

const getTasks = async () => {
  try {
    return await TaskSchema.find({});
  } catch (error) {
    console.log(error);
  }
};

export default getTasks;
