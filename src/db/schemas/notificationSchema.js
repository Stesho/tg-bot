import mongoose, { Schema } from 'mongoose';
import { isValidTime } from '../../utils/index.js';
import { repliesMessages } from '../../constants/messages/index.js';

const NotificationSchema = new Schema({
  chatId: {
    type: String,
    required: true,
  },
  city: {
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

const NotificationModel = mongoose.model('Notification', NotificationSchema);

export { NotificationModel };
