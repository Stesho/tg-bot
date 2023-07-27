import { buttonsMessages, textMessages } from '@constants/messages/index.js';
import {
  RECOMMEND_EVENTS_SCENE,
  RECOMMEND_PLACES_SCENE,
  RECOMMEND_SCENE,
} from '@constants/scenes/index.js';
import { Markup, Scenes } from 'telegraf';

const recommendScene = new Scenes.BaseScene(RECOMMEND_SCENE);

recommendScene.enter(async (ctx) => {
  await ctx.reply(
    textMessages.recommendSceneTitle,
    Markup.inlineKeyboard([
      [
        Markup.button.callback(
          buttonsMessages.recommendEvents,
          RECOMMEND_EVENTS_SCENE,
        ),
      ],
      [
        Markup.button.callback(
          buttonsMessages.recommendPlaces,
          RECOMMEND_PLACES_SCENE,
        ),
      ],
    ]).resize(),
  );
});

recommendScene.action(RECOMMEND_EVENTS_SCENE, async (ctx) => {
  return ctx.scene.enter(RECOMMEND_EVENTS_SCENE);
});

recommendScene.action(RECOMMEND_PLACES_SCENE, async (ctx) => {
  return ctx.scene.enter(RECOMMEND_PLACES_SCENE);
});

export { recommendScene };
