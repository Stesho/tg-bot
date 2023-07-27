import { isValidTime } from '@utils/validators/index.js';
import mongoose, { Schema } from 'mongoose';

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 100,
  },
  content: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 400,
  },
  userId: {
    type: String,
    required: true,
  },
  chatId: {
    type: String,
    required: true,
  },
  notificationTime: {
    type: String,
    validate: (time) => isValidTime(time),
  },
});

const TaskModel = mongoose.model('Task', TaskSchema);

export { TaskModel };
