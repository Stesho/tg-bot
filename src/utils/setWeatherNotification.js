import schedule from 'node-schedule';
import { getWeatherInCity } from '../api/weather/getWeatherInCity.js';
import getNotificationsByTime from '../db/notification/getNotificationsByTime.js';
import textMessages from '../constants/messages/textMessages.js';
import getCurrentTime from './getCurrentTime.js';

const handleScheduler = async (bot) => {
  const time = getCurrentTime();
  const notifications = await getNotificationsByTime(time);

  for (let notification of notifications.data) {
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

export default setWeatherNotification;