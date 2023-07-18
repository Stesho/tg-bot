import { errorsMessages } from '../../constants/messages/index.js';
import { NotificationModel } from '../schemas/index.js';

const getNotificationsByTime = async (time) => {
  try {
    const tasks = await NotificationModel.find({
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

export { getNotificationsByTime };
