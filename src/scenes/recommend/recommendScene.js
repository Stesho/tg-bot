import { Markup, Scenes } from 'telegraf';
import {
  RECOMMEND_EVENTS_SCENE,
  RECOMMEND_PLACES_SCENE,
  RECOMMEND_SCENE,
} from '../../constants/scenes/recommendScenesConst.js';
import messages from '../../constants/messages/messages.js';

const recommendScene = new Scenes.BaseScene(RECOMMEND_SCENE);

recommendScene.enter(async (ctx) => {
  await ctx.reply(
    messages.recommendSceneTitle,
    Markup.inlineKeyboard([
      [
        Markup.button.callback(
          messages.recommendEvents,
          RECOMMEND_EVENTS_SCENE,
        ),
      ],
      [
        Markup.button.callback(
          messages.recommendPlaces,
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

export default recommendScene;
