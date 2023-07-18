import errorsMessages from '../../constants/messages/errorsMessages.js';
import NotificationSchema from '../schemas/notificationSchema.js';

const getNotificationByChatId = async (chatId) => {
  try {
    const notification = await NotificationSchema.findOne({
      chatId,
    });
    return {
      isError: false,
      data: notification,
    };
  } catch (error) {
    return {
      isError: true,
      data: errorsMessages.getOneNotificationError,
    };
  }
};

export default getNotificationByChatId;
