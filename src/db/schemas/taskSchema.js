import mongoose, { Schema } from 'mongoose';

const TaskSchema = new Schema({
  title: String,
  content: String,
  userId: String,
  chatId: String,
  notificationTime: String,
});

const TaskModel = mongoose.model('Task', TaskSchema);

export default TaskModel;
