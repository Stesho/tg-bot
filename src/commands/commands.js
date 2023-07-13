import { getRandomImageByQuery } from '../services/imagesService.js';
import { WEATHER_SCENE } from '../constants/scenes/weatherScenesConst.js';
import { TASKS_SCENE } from '../constants/scenes/tasksScenesConst.js';
import { RECOMMEND_SCENE } from '../constants/scenes/recommendScenesConst.js';
import messages from '../constants/messages/messages.js';

const start = (ctx) => {
  const username = ctx.message.from.first_name || ctx.message.from.username;
  ctx.reply(messages.greeting(username));
};

const help = (ctx) => ctx.reply(messages.help);
const weather = (ctx) => ctx.scene.enter(WEATHER_SCENE);
const dog = (ctx) => getRandomImageByQuery(ctx, 'dog');
const cat = (ctx) => getRandomImageByQuery(ctx, 'cat');
const tasks = (ctx) => ctx.scene.enter(TASKS_SCENE);
const recommend = (ctx) => ctx.scene.enter(RECOMMEND_SCENE);

export { start, help, weather, dog, cat, tasks, recommend };
