import { Scenes } from 'telegraf';

import { getWeatherInCity } from '../../api/index.js';
import {
  repliesMessages,
  textMessages,
} from '../../constants/messages/index.js';
import { GET_WEATHER_SCENE } from '../../constants/scenes/index.js';

const askCity = (ctx) => {
  ctx.reply(repliesMessages.askCity);
  ctx.wizard.next();
};

const getWeather = async (ctx) => {
  if (!ctx.message?.text) {
    return ctx.reply(repliesMessages.invalidMessage);
  }

  const weatherInfo = await getWeatherInCity(ctx.message.text);

  if (weatherInfo.isError) {
    return ctx.reply(weatherInfo.data);
  }

  const weatherReplyText = textMessages.weatherOverview(weatherInfo.data);
  ctx.replyWithHTML(weatherReplyText);

  return ctx.scene.leave();
};

const weatherReceptionScene = new Scenes.WizardScene(
  GET_WEATHER_SCENE,
  askCity,
  getWeather,
);

export { weatherReceptionScene };
