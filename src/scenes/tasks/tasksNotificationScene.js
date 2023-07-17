import parseTime from '../../utils/parseTime.js';
import schedule from 'node-schedule';
import { Markup, Scenes } from 'telegraf';
import {
  TASK_NOTIFICATION_SCENE,
  TASK_OPTIONS_SCENE,
} from '../../constants/scenes/tasksScenesConst.js';
import getOneTask from '../../db/task/getOneTask.js';
import textMessages from '../../constants/messages/textMessages.js';
import isValidateTime from '../../utils/validateTime.js';
import buttonsMessages from '../../constants/messages/buttonsMessages.js';
import errorsMessages from '../../constants/messages/errorsMessages.js';
import repliesMessages from '../../constants/messages/repliesMessages.js';

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

  if (!isValidateTime(time)) {
    return ctx.reply(repliesMessages.invalidTime);
  }

  const [hours, minutes] = parseTime(time);
  const { taskId, userId } = ctx.scene.state;

  schedule.scheduleJob(
    `task-notification_${userId}_${taskId}`,
    `${minutes} ${hours} * * *`,
    async () => {
      const task = await getOneTask(taskId);

      if (task.isError) {
        return ctx.reply(task.data);
      }

      if (!task.data) {
        return ctx.reply(errorsMessages.getOneTaskError);
      }

      return ctx.reply(
        `${task.data.title}
         ${task.data.content}`,
      );
    },
  );

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
