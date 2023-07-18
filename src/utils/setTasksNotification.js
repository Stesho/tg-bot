import schedule from 'node-schedule';
import getTasksByTime from '../db/task/getTasksByTime.js';
import updateManyTasks from '../db/task/updateManyTasks.js';
import textMessages from '../constants/messages/textMessages.js';

const handleScheduler = async (bot) => {
  const currentDate = new Date();
  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  const time = `${hours}:${minutes}`;
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
