import { Scenes } from 'telegraf';
import { SUBSCRIBE_WEATHER_SCENE } from '../../constants/scenes/weatherScenesConst.js';
import { getWeatherInCity } from '../../api/weather/getWeatherInCity.js';
import isValidTime from '../../utils/isValidTime.js';
import repliesMessages from '../../constants/messages/repliesMessages.js';
import addNotification from '../../db/notification/addNotification.js';
import getNotificationByChatId from '../../db/notification/getNotificationByChatId.js';
import updateNotification from '../../db/notification/updateNotification.js';

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

  ctx.wizard.next();
};

const subscribe = async (ctx) => {
  if (!ctx.message?.text) {
    return ctx.reply(repliesMessages.invalidMessage);
  }

  const city = ctx.wizard.state.weather.city;
  const time = ctx.message.text;
  const chatId = ctx.update.message.from.id;

  if (!isValidTime(time)) {
    return ctx.reply(repliesMessages.invalidTime);
  }

  const currentNotification = await getNotificationByChatId(chatId);

  if (!currentNotification.isError && currentNotification.data) {
    await updateNotification(chatId, {
      city: city,
      notificationTime: time,
    });

    ctx.reply(repliesMessages.userSubscribedSuccessfully);

    return ctx.scene.leave();
  }

  const notification = {
    chatId: chatId,
    city: city,
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

export default weatherSubscriptionScene;
