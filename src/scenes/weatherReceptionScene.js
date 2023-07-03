import { Scenes } from 'telegraf';
import { GET_WEATHER_SCENE } from '../constants/scenes.js';
import { getWeatherInCity } from '../api/weatherApi.js';

const askCity = (ctx) => {
  ctx.reply('Enter City');
  ctx.wizard.next();
};

const getWeather = async (ctx) => {
  try {
    const weatherInfo = await getWeatherInCity(ctx.message.text);
    ctx.reply(
      `Weather in ${weatherInfo.name}:
    main: ${weatherInfo.weather[0].main}
    description: ${weatherInfo.weather[0].description}
    temp: ${weatherInfo.main.temp}`,
    );
  } catch (error) {
    ctx.reply('Try again');
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
