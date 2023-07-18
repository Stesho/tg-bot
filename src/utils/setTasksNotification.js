import schedule from 'node-schedule';
import getTasksByTime from '../db/task/getTasksByTime.js';
import updateManyTasks from '../db/task/updateManyTasks.js';
import textMessages from '../constants/messages/textMessages.js';
import getCurrentTime from './getCurrentTime.js';

const handleScheduler = async (bot) => {
  const time = getCurrentTime();
  const tasks = await getTasksByTime(time);

  tasks.data.forEach((task) => {
    bot.telegram.sendMessage(task.chatId, textMessages.taskOverview(task));
  });

  return await updateManyTasks(
    {
      notificationTime: time,
    },
    {
      notificationTime: null,
    },
  );
};

const setTasksNotification = (bot) => {
  const rule = new schedule.RecurrenceRule();
  rule.second = 0;

  schedule.scheduleJob(rule, () => handleScheduler(bot));
};

export default setTasksNotification;
