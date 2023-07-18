import { WEATHER_SCENE } from '../constants/scenes/weatherScenesConst.js';
import { TASKS_SCENE } from '../constants/scenes/tasksScenesConst.js';
import { RECOMMEND_SCENE } from '../constants/scenes/recommendScenesConst.js';
import textMessages from '../constants/messages/textMessages.js';
import repliesMessages from '../constants/messages/repliesMessages.js';
import getRandomImage from '../api/images/getRandomImage.js';

const getRandomImageByQuery = async (ctx, query) => {
  const loadingMessage = await ctx.reply(repliesMessages.loading);
  const resources = await getRandomImage(query);

  if (resources.isError) {
    return ctx.reply(resources.data);
  }

  const imageInfo = resources.data.photos[0];
  await ctx.replyWithPhoto({
    url: imageInfo.src.medium || imageInfo.src.large,
  });
  ctx.deleteMessage(loadingMessage.message_id, loadingMessage.chat.id);
};

const start = (ctx) => {
  const username = ctx.message.from.first_name || ctx.message.from.username;
  ctx.reply(textMessages.greeting(username));
};

const help = (ctx) => ctx.reply(textMessages.help);

const weather = (ctx) => ctx.scene.enter(WEATHER_SCENE);

const dog = (ctx) => getRandomImageByQuery(ctx, 'dog');

const cat = (ctx) => getRandomImageByQuery(ctx, 'cat');

const tasks = (ctx) => ctx.scene.enter(TASKS_SCENE);

const recommend = (ctx) => ctx.scene.enter(RECOMMEND_SCENE);

const cancel = (ctx) => ctx.scene.leave();

export { start, help, weather, cat, dog, tasks, recommend, cancel };
