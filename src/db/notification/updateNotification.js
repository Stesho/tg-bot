import errorsMessages from '../../constants/messages/errorsMessages.js';
import NotificationSchema from '../schemas/notificationSchema.js';

const updateNotification = async (chatId, updatedFields) => {
  try {
    const updatedNotification = await NotificationSchema.updateOne(
      {
        chatId,
      },
      {
        $set: updatedFields,
      },
    );
    return {
      isError: false,
      data: updatedNotification,
    };
  } catch (error) {
    return {
      isError: true,
      data: errorsMessages.updateTaskError,
    };
  }
};

export default updateNotification;
