import mongoose, { Schema } from 'mongoose';

const TaskSchema = new Schema({
  title: String,
  content: String,
  user_id: String,
});

const TaskModel = mongoose.model('Task', TaskSchema);

export default TaskModel;
