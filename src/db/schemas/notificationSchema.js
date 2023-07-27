import { isValidTime } from '@utils/validators/index.js';
import mongoose, { Schema } from 'mongoose';

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
    validate: (time) => isValidTime(time),
  },
});

const NotificationModel = mongoose.model('Notification', NotificationSchema);

export { NotificationModel };
