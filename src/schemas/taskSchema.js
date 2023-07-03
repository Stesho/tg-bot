import mongoose, { Schema } from 'mongoose';

const TaskSchema = new Schema({
  id: String,
  title: String,
  content: String,
});

const TaskModel = mongoose.model('Task', TaskSchema);

export default TaskModel;
