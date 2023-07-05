import TaskSchema from '../schemas/taskSchema.js';

const editTask = async (taskId, updatedTaskFields) => {
  try {
    return await TaskSchema.updateOne(
      {
        _id: taskId,
      },
      {
        $set: updatedTaskFields,
      },
    );
  } catch (error) {
    console.log(error);
  }
};

export default editTask;
