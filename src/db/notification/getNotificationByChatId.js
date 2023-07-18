import { errorsMessages } from '../../constants/messages/index.js';
import { NotificationModel } from '../schemas/index.js';

const getNotificationByChatId = async (chatId) => {
  try {
    const notification = await NotificationModel.findOne({
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

export { getNotificationByChatId };
