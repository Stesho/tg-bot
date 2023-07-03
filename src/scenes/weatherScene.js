import { Scenes, Markup } from 'telegraf';
import {
  GET_WEATHER_SCENE,
  SUBSCRIBE_WEATHER_SCENE,
  WEATHER_SCENE,
} from '../constants/scenes.js';

const weatherScene = new Scenes.BaseScene(WEATHER_SCENE);

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

export default weatherScene;
