import mongoose, { Schema } from 'mongoose';
import { isValidTime } from '../../utils/index.js';
import { repliesMessages } from '../../constants/messages/index.js';

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
    validate: {
      validator: isValidTime,
      message: repliesMessages.invalidTime,
    },
  },
});

const TaskModel = mongoose.model('Task', TaskSchema);

export { TaskModel };
