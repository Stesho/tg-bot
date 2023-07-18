import { Scenes } from 'telegraf';
import { GET_WEATHER_SCENE } from '../../constants/scenes/weatherScenesConst.js';
import { getWeatherInCity } from '../../api/weather/getWeatherInCity.js';
import repliesMessages from '../../constants/messages/repliesMessages.js';
import textMessages from '../../constants/messages/textMessages.js';

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

export default weatherReceptionScene;
