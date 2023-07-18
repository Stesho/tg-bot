import mongoose, { Schema } from 'mongoose';

const NotificationSchema = new Schema({
  chatId: String,
  city: String,
  notificationTime: String,
});

const NotificationModel = mongoose.model('Notification', NotificationSchema);

export default NotificationModel;
