import { getWeatherInCity } from '@api/index.js';
import { textMessages } from '@constants/messages/index.js';
import { getNotificationsByTime } from '@db/notification/index.js';
import { getCurrentTime } from '@utils/date/index.js';
import schedule from 'node-schedule';

const handleScheduler = async (bot) => {
  const time = getCurrentTime();
  const notifications = await getNotificationsByTime(time);

  for (const notification of notifications.data) {
    const weatherInfo = await getWeatherInCity(notification.city);

    if (weatherInfo.isError) {
      continue;
    }

    const weatherReplyText = textMessages.weatherOverview(weatherInfo.data);
    await bot.telegram.sendMessage(notification.chatId, weatherReplyText, {
      parse_mode: 'HTML',
    });
  }
};

const setWeatherNotification = (bot) => {
  const rule = new schedule.RecurrenceRule();
  rule.second = 0;

  schedule.scheduleJob(rule, () => handleScheduler(bot));
};

export { setWeatherNotification };
