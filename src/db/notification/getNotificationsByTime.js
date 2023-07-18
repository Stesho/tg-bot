import errorsMessages from '../../constants/messages/errorsMessages.js';
import NotificationSchema from '../schemas/notificationSchema.js';

const getNotificationsByTime = async (time) => {
  try {
    const tasks = await NotificationSchema.find({
      notificationTime: time,
    });
    return {
      isError: false,
      data: tasks,
    };
  } catch (error) {
    return {
      isError: true,
      data: errorsMessages.getAllNotificationError,
    };
  }
};

export default getNotificationsByTime;
