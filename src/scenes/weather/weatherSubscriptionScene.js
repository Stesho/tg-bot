import { Scenes } from 'telegraf';
import {
  SUBSCRIBE_WEATHER_SCENE,
  UNSUBSCRIBE_WEATHER_SCENE,
} from '../../constants/scenes/weatherScenesConst.js';
import schedule from 'node-schedule';
import { getWeatherInCity } from '../../api/weather/getWeatherInCity.js';
import parseTime from '../../utils/parseTime.js';
import getWeatherReplyText from '../../utils/getWeatherReplyText.js';
import isValidateTime from '../../utils/validateTime.js';
import repliesMessages from '../../constants/messages/repliesMessages.js';

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

  if (!isValidateTime(time)) {
    return ctx.reply(repliesMessages.invalidTime);
  }

  const [hours, minutes] = parseTime(time);
  schedule.scheduleJob(
    UNSUBSCRIBE_WEATHER_SCENE,
    `${minutes} ${hours} * * *`,
    async () => {
      const weatherInfo = await getWeatherInCity(city);
      const weatherReplyText = getWeatherReplyText(weatherInfo.data);
      ctx.replyWithHTML(weatherReplyText);
    },
  );

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
