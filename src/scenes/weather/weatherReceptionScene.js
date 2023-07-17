import { Scenes } from 'telegraf';
import { GET_WEATHER_SCENE } from '../../constants/scenes/weatherScenesConst.js';
import { getWeatherInCity } from '../../api/weather/getWeatherInCity.js';
import getWeatherReplyText from '../../utils/getWeatherReplyText.js';
import repliesMessages from '../../constants/messages/repliesMessages.js';

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

  const weatherReplyText = getWeatherReplyText(weatherInfo.data);
  ctx.replyWithHTML(weatherReplyText);

  return ctx.scene.leave();
};

const weatherReceptionScene = new Scenes.WizardScene(
  GET_WEATHER_SCENE,
  askCity,
  getWeather,
);

export default weatherReceptionScene;
