import { Scenes } from 'telegraf';
import { SUBSCRIBE_WEATHER_SCENE } from '../constants/scenes.js';
import schedule from 'node-schedule';
import { getWeatherInCity } from '../api/weatherApi.js';
import validateTime from '../utils/validateTime.js';
import parseTime from '../utils/parseTime.js';

const askCity = (ctx) => {
  ctx.wizard.state.weather = {
    city: '',
    time: '',
  };
  ctx.reply('Enter city');
  ctx.wizard.next();
};

const askTime = async (ctx) => {
  try {
    await getWeatherInCity(ctx.message.text);
    ctx.wizard.state.weather.city = ctx.message.text;
    ctx.reply('Enter the time in the format 15:00');
    ctx.wizard.next();
  } catch (error) {
    ctx.reply('City not found. Try again');
  }
};

const subscribe = async (ctx) => {
  try {
    const city = ctx.wizard.state.weather.city;
    const time = ctx.message.text;
    ctx.wizard.state.weather.time = time;

    if (!validateTime(time)) {
      throw new Error();
    }

    const [hours, minutes] = parseTime(time);
    schedule.scheduleJob(`${minutes} ${hours} * * *`, async () => {
      const weatherInfo = await getWeatherInCity(city);
      ctx.reply(
        `Weather in ${weatherInfo.name}:
        main: ${weatherInfo.weather[0].main}
        description: ${weatherInfo.weather[0].description}
        temp: ${weatherInfo.main.temp}`,
      );
    });

    ctx.reply('You are successfully subscribe');
    return ctx.scene.leave();
  } catch (error) {
    ctx.reply('Invalid time. Try again');
    return;
  }
};

const weatherSubscriptionScene = new Scenes.WizardScene(
  SUBSCRIBE_WEATHER_SCENE,
  askCity,
  askTime,
  subscribe,
);

export default weatherSubscriptionScene;
