import { Scenes } from 'telegraf';
import { GET_WEATHER_SCENE } from '../../constants/scenes/weatherScenesConst.js';
import { getWeatherInCity } from '../../api/weather/getWeatherInCity.js';
import messages from '../../constants/messages/messages.js';
import getWeatherReplyText from '../../utils/getWeatherReplyText.js';

const askCity = (ctx) => {
  ctx.reply(messages.askCity);
  ctx.wizard.next();
};

const getWeather = async (ctx) => {
  try {
    const weatherInfo = await getWeatherInCity(ctx.message.text);
    const weatherReplyText = getWeatherReplyText(weatherInfo);
    ctx.replyWithHTML(weatherReplyText);
  } catch (error) {
    ctx.reply(messages.serverError);
    return;
  }
  return ctx.scene.leave();
};

const weatherReceptionScene = new Scenes.WizardScene(
  GET_WEATHER_SCENE,
  askCity,
  getWeather,
);

export default weatherReceptionScene;
