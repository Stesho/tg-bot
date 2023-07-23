import mongoose, { Schema } from 'mongoose';

import { isValidTime } from '../../utils/index.js';

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
