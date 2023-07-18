import { Scenes, Markup } from 'telegraf';
import {
  GET_WEATHER_SCENE,
  SUBSCRIBE_WEATHER_SCENE,
  UNSUBSCRIBE_WEATHER_SCENE,
  WEATHER_SCENE,
} from '../../constants/scenes/weatherScenesConst.js';
import schedule from 'node-schedule';
import textMessages from '../../constants/messages/textMessages.js';
import buttonsMessages from '../../constants/messages/buttonsMessages.js';
import repliesMessages from '../../constants/messages/repliesMessages.js';

const weatherScene = new Scenes.BaseScene(WEATHER_SCENE);

weatherScene.enter(async (ctx) => {
  await ctx.reply(
    textMessages.weatherSceneTitle,
    Markup.inlineKeyboard([
      [
        Markup.button.callback(
          buttonsMessages.weatherRequest,
          GET_WEATHER_SCENE,
        ),
      ],
      [
        Markup.button.callback(
          buttonsMessages.weatherSubscribe,
          SUBSCRIBE_WEATHER_SCENE,
        ),
      ],
      [
        Markup.button.callback(
          buttonsMessages.weatherUnsubscribe,
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
  ctx.reply(repliesMessages.userUnsubscribedSuccessfully);
  return ctx.scene.leave();
});

export default weatherScene;
