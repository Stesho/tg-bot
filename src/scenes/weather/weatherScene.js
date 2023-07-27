import {
  buttonsMessages,
  repliesMessages,
  textMessages,
} from '@constants/messages/index.js';
import {
  GET_WEATHER_SCENE,
  SUBSCRIBE_WEATHER_SCENE,
  UNSUBSCRIBE_WEATHER_SCENE,
  WEATHER_SCENE,
} from '@constants/scenes/index.js';
import { deleteNotificationByChatId } from '@db/notification/index.js';
import { Markup, Scenes } from 'telegraf';

const weatherScene = new Scenes.BaseScene(WEATHER_SCENE);

weatherScene.enter(async (ctx) => {
  ctx.scene.state.chatId = ctx.update.message.from.id;

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

weatherScene.action(UNSUBSCRIBE_WEATHER_SCENE, async (ctx) => {
  const { chatId } = ctx.scene.state;
  const deletedNotification = await deleteNotificationByChatId(chatId);

  if (deletedNotification.isError) {
    ctx.reply(deletedNotification.data);
  }

  ctx.reply(repliesMessages.userUnsubscribedSuccessfully);

  return ctx.scene.leave();
});

export { weatherScene };
