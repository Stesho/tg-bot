import errorsMessages from '../../constants/messages/errorsMessages.js';
import NotificationModel from '../schemas/notificationSchema.js';
import NotificationSchema from '../schemas/notificationSchema.js';
const addNotification = async (notification) => {
  try {
    const addedNotification = await NotificationSchema.create(notification);
    return {
      isError: false,
      data: addedNotification,
    };
  } catch (error) {
    return {
      isError: true,
      data: errorsMessages.addNotificationError,
    };
  }
};

export default addNotification;
