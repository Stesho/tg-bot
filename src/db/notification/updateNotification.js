import { errorsMessages } from '@constants/messages/index.js';
import { NotificationModel } from '@db/schemas/index.js';

const updateNotification = async (chatId, updatedFields) => {
  try {
    const updatedNotification = await NotificationModel.updateOne(
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

export { updateNotification };
