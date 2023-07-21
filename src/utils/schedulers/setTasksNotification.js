import schedule from 'node-schedule';
import { getTasksByTime, updateManyTasks } from '../../db/task/index.js';
import { textMessages } from '../../constants/messages/index.js';
import { getCurrentTime } from '../other/getCurrentTime.js';

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

export { setTasksNotification };
