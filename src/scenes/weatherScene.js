import { Scenes, Markup } from 'telegraf';
import { WEATHER_SCENE } from '../constants/scenes.js';
import { getWeatherInCity } from '../api/weatherApi.js';

export const weatherScene = new Scenes.BaseScene(WEATHER_SCENE);

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
  ctx.reply('Enter City');
});

weatherScene.action('subscribe-weather', (ctx) => {
  ctx.reply('Subscribe weather');
});

weatherScene.on('text', async (ctx) => {
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
});
