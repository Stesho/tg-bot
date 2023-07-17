import { Scenes, Markup } from 'telegraf';
import {
  GET_WEATHER_SCENE,
  SUBSCRIBE_WEATHER_SCENE,
  UNSUBSCRIBE_WEATHER_SCENE,
  WEATHER_SCENE,
} from '../../constants/scenes/weatherScenesConst.js';
import schedule from 'node-schedule';
import messages from '../../constants/messages/messages.js';

const weatherScene = new Scenes.BaseScene(WEATHER_SCENE);

weatherScene.enter((ctx) => {
  ctx.reply(
    messages.weatherSceneTitle,
    Markup.inlineKeyboard([
      [Markup.button.callback(messages.weatherRequest, GET_WEATHER_SCENE)],
      [
        Markup.button.callback(
          messages.weatherSubscribe,
          SUBSCRIBE_WEATHER_SCENE,
        ),
      ],
      [
        Markup.button.callback(
          messages.weatherUnsubscribe,
          UNSUBSCRIBE_WEATHER_SCENE,
        ),
      ],
    ]).resize(),
  );
});

weatherScene.action(GET_WEATHER_SCENE, (ctx) => {
  return ctx.scene.enter(GET_WEATHER_SCENE);
});

weatherScene.action(SUBSCRIBE_WEATHER_SCENE, (ctx) => {
  return ctx.scene.enter(SUBSCRIBE_WEATHER_SCENE);
});

weatherScene.action(UNSUBSCRIBE_WEATHER_SCENE, (ctx) => {
  schedule.cancelJob(UNSUBSCRIBE_WEATHER_SCENE);
  return ctx.scene.leave();
});

export default weatherScene;
