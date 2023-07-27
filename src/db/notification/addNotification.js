import { errorsMessages } from '@constants/messages/index.js';
import { NotificationModel } from '@db/schemas/index.js';

const addNotification = async (notification) => {
  try {
    const addedNotification = await NotificationModel.create(notification);
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

export { addNotification };
