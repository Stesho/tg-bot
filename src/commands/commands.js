import { getRandomImageByQuery } from '../services/imagesService.js';
import { WEATHER_SCENE } from '../constants/scenes/weatherScenesConst.js';
import { TASKS_SCENE } from '../constants/scenes/tasksScenes.js';

const start = (ctx) => {
  const username = ctx.message.from.first_name || ctx.message.from.username;
  ctx.reply(`Welcome, ${username}`);
};

const help = (ctx) => ctx.reply('Weather');
const weather = (ctx) => ctx.scene.enter(WEATHER_SCENE);
const dog = (ctx) => getRandomImageByQuery(ctx, 'dog');
const cat = (ctx) => getRandomImageByQuery(ctx, 'cat');
const tasks = (ctx) => ctx.scene.enter(TASKS_SCENE);

export { start, help, weather, dog, cat, tasks };
