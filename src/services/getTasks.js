import TaskSchema from '../schemas/taskSchema.js';

const getTasks = async (userId) => {
  try {
    return await TaskSchema.find({
      user_id: userId,
    });
  } catch (error) {
    console.log(error);
  }
};

export default getTasks;
