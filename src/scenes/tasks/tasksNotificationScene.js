import parseTime from '../../utils/parseTime.js';
import schedule from 'node-schedule';
import { Markup, Scenes } from 'telegraf';
import { TASK_NOTIFICATION_SCENE } from '../../constants/scenes/tasksScenesConst.js';
import getOneTask from '../../db/task/getOneTask.js';
import messages from '../../constants/messages/messages.js';

const setNotification = async (ctx) => {
  const time = ctx.message.text;
  const [hours, minutes] = parseTime(time);
  const { taskId, userId } = ctx.scene.state;

  schedule.scheduleJob(
    `task-notification_${userId}_${taskId}`,
    `${minutes} ${hours} * * *`,
    async () => {
      const task = await getOneTask(taskId);
      ctx.reply(
        `${task.title}
         ${task.content}`,
      );
    },
  );

  ctx.reply(messages.notificationCreatedSuccessfully(hours, minutes));
};

const tasksNotificationScene = new Scenes.WizardScene(
  TASK_NOTIFICATION_SCENE,
  async (ctx) => {
    await ctx.editMessageText(messages.taskNotificationSceneTitle, {
      reply_markup: {
        inline_keyboard: [
          [Markup.button.callback(messages.backButton, `back`)],
        ],
      },
    });
    await ctx.reply(messages.askTime);
    return ctx.wizard.next();
  },
  setNotification,
);

tasksNotificationScene.action('back', async (ctx) => {
  return ctx.scene.enter('selectTaskOptionMenu', ctx.scene.state);
});

export default tasksNotificationScene;
