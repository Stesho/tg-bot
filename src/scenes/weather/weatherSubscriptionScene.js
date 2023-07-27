import { getWeatherInCity } from '@api/index.js';
import { repliesMessages } from '@constants/messages/index.js';
import { SUBSCRIBE_WEATHER_SCENE } from '@constants/scenes/index.js';
import {
  addNotification,
  getNotificationByChatId,
  updateNotification,
} from '@db/notification/index.js';
import { isValidTime } from '@utils/validators/index.js';
import { Scenes } from 'telegraf';

const askCity = (ctx) => {
  ctx.wizard.state.weather = {
    city: '',
    time: '',
  };
  ctx.reply(repliesMessages.askCity);
  ctx.wizard.next();
};

const askTime = async (ctx) => {
  if (!ctx.message?.text) {
    return ctx.reply(repliesMessages.invalidMessage);
  }

  const weatherInfo = await getWeatherInCity(ctx.message.text);

  if (weatherInfo.isError) {
    return ctx.reply(weatherInfo.data);
  }

  ctx.wizard.state.weather.city = ctx.message.text;
  ctx.reply(repliesMessages.askTime);

  return ctx.wizard.next();
};

const subscribe = async (ctx) => {
  if (!ctx.message?.text) {
    return ctx.reply(repliesMessages.invalidMessage);
  }

  const { city } = ctx.wizard.state.weather;
  const time = ctx.message.text;
  const chatId = ctx.update.message.from.id;

  if (!isValidTime(time)) {
    return ctx.reply(repliesMessages.invalidTime);
  }

  const currentNotification = await getNotificationByChatId(chatId);

  if (!currentNotification.isError && currentNotification.data) {
    await updateNotification(chatId, {
      city,
      notificationTime: time,
    });

    ctx.reply(repliesMessages.userSubscribedSuccessfully);

    return ctx.scene.leave();
  }

  const notification = {
    chatId,
    city,
    notificationTime: time,
  };

  const addedNotification = await addNotification(notification);

  if (addedNotification.isError) {
    return ctx.reply(addedNotification.data);
  }

  ctx.reply(repliesMessages.userSubscribedSuccessfully);
  return ctx.scene.leave();
};

const weatherSubscriptionScene = new Scenes.WizardScene(
  SUBSCRIBE_WEATHER_SCENE,
  askCity,
  askTime,
  subscribe,
);

export { weatherSubscriptionScene };
