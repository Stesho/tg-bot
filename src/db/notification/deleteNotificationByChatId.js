import errorsMessages from '../../constants/messages/errorsMessages.js';
import NotificationSchema from '../schemas/notificationSchema.js';

const deleteNotificationByChatId = async (chatId) => {
  try {
    const deletedNotification = await NotificationSchema.deleteOne({
      chatId: chatId,
    });
    return {
      isError: false,
      data: deletedNotification,
    };
  } catch (error) {
    return {
      isError: true,
      data: errorsMessages.deleteNotificationError,
    };
  }
};

export default deleteNotificationByChatId;
