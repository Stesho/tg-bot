import { Scenes, Markup } from 'telegraf';
import {
  GET_WEATHER_SCENE,
  SUBSCRIBE_WEATHER_SCENE,
  WEATHER_SCENE,
} from '../constants/scenes.js';
import { getWeatherInCity } from '../api/weatherApi.js';
import schedule from 'node-schedule';

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

const askTime = (ctx) => {
  ctx.reply('Enter time');
  ctx.wizard.next();
};

const subscribe = (ctx) => {
  schedule.scheduleJob('00 * * * *', async () => {
    const weatherInfo = await getWeatherInCity('Minsk');
    ctx.reply(
      `Weather in ${weatherInfo.name}:
      main: ${weatherInfo.weather[0].main}
      description: ${weatherInfo.weather[0].description}
      temp: ${weatherInfo.main.temp}`,
    );
  });
  ctx.reply('You are successfully subscribe');
};

export const weatherScene = new Scenes.BaseScene(WEATHER_SCENE);
export const getWeatherScene = new Scenes.WizardScene(
  GET_WEATHER_SCENE,
  askCity,
  getWeather,
);
export const subscribeWeatherScene = new Scenes.WizardScene(
  SUBSCRIBE_WEATHER_SCENE,
  askTime,
  subscribe,
);

weatherScene.enter((ctx) => {
  ctx.reply(
    'Weather',
    Markup.inlineKeyboard([
      Markup.button.callback('Get weather from city', 'get-weather'),
      Markup.button.callback('Subscribe', 'subscribe-weather'),
    ]).resize(),
  );
});

weatherScene.action('get-weather', (ctx) => {
  return ctx.scene.enter(GET_WEATHER_SCENE);
});

weatherScene.action('subscribe-weather', (ctx) => {
  return ctx.scene.enter(SUBSCRIBE_WEATHER_SCENE);
});
