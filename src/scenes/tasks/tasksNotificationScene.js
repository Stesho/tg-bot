import parseTime from '../../utils/parseTime.js';
import { Markup, Scenes } from 'telegraf';
import {
  TASK_NOTIFICATION_SCENE,
  TASK_OPTIONS_SCENE,
} from '../../constants/scenes/tasksScenesConst.js';
import isValidTime from '../../utils/isValidTime.js';
import buttonsMessages from '../../constants/messages/buttonsMessages.js';
import repliesMessages from '../../constants/messages/repliesMessages.js';
import updateTask from '../../db/task/updateTask.js';

const askTime = async (ctx) => {
  await ctx.editMessageReplyMarkup({
    inline_keyboard: [
      [Markup.button.callback(buttonsMessages.backButton, `back`)],
    ],
  });

  await ctx.reply(repliesMessages.askTime);

  return ctx.wizard.next();
};

const setNotification = async (ctx) => {
  if (!ctx.message?.text) {
    return ctx.reply(repliesMessages.invalidMessage);
  }

  const time = ctx.message.text;

  if (!isValidTime(time)) {
    return ctx.reply(repliesMessages.invalidTime);
  }

  const [hours, minutes] = parseTime(time);
  const { taskId } = ctx.scene.state;

  const updatedTask = await updateTask(taskId, {
    notificationTime: time,
  });

  if (updatedTask.isError) {
    return ctx.reply(updateTask.data);
  }

  ctx.reply(repliesMessages.notificationCreatedSuccessfully(hours, minutes));
};

const tasksNotificationScene = new Scenes.WizardScene(
  TASK_NOTIFICATION_SCENE,
  askTime,
  setNotification,
);

tasksNotificationScene.action('back', async (ctx) => {
  return ctx.scene.enter(TASK_OPTIONS_SCENE, ctx.scene.state);
});

export default tasksNotificationScene;
