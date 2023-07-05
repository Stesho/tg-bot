import parseTime from '../../utils/parseTime.js';
import schedule from 'node-schedule';
import { Scenes } from 'telegraf';
import { TASK_NOTIFICATION_SCENE } from '../../constants/scenes/tasksScenesConst.js';
import getOneTask from '../../services/getOneTask.js';

const askTime = async (ctx) => {
  ctx.reply('Enter the notification time');
  return ctx.wizard.next();
};

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

  return ctx.scene.leave();
};

const tasksNotificationScene = new Scenes.WizardScene(
  TASK_NOTIFICATION_SCENE,
  askTime,
  setNotification,
);

export default tasksNotificationScene;
