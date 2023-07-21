import { errorsMessages } from '../../constants/messages/index.js';
import { NotificationModel } from '../schemas/index.js';

const deleteNotificationByChatId = async (chatId) => {
  try {
    const deletedNotification = await NotificationModel.deleteOne({
      chatId,
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

export { deleteNotificationByChatId };
