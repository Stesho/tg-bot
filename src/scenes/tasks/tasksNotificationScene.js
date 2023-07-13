import parseTime from '../../utils/parseTime.js';
import schedule from 'node-schedule';
import { Markup, Scenes } from 'telegraf';
import { TASK_NOTIFICATION_SCENE } from '../../constants/scenes/tasksScenesConst.js';
import getOneTask from '../../models/task/getOneTask.js';

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

  ctx.reply(`You are successfully set notification at ${hours}:${minutes}`);
};

const tasksNotificationScene = new Scenes.WizardScene(
  TASK_NOTIFICATION_SCENE,
  async (ctx) => {
    const taskId = ctx.scene.state.taskId;
    await ctx.editMessageText(
      `Set notification
      taskId: ${taskId}`,
      {
        reply_markup: {
          inline_keyboard: [[Markup.button.callback('Back', `back`)]],
        },
      },
    );
    await ctx.reply('Enter the notification time');
    return ctx.wizard.next();
  },
  setNotification,
);

tasksNotificationScene.action('back', async (ctx) => {
  return ctx.scene.enter('selectTaskOptionMenu', ctx.scene.state);
});

export default tasksNotificationScene;
