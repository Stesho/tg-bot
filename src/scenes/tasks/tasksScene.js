import { Markup, Scenes } from 'telegraf';
import { TASKS_SCENE } from '../../constants/scenes/tasksScenes.js';

const tasksScene = new Scenes.BaseScene(TASKS_SCENE);

tasksScene.enter((ctx) => {
  ctx.reply(
    'Tasks',
    Markup.inlineKeyboard([
      [Markup.button.callback('Show my tasks', 'get-tasks')],
      [Markup.button.callback('Add new task', 'subscribe-weather')],
    ]).resize(),
  );
});

export default tasksScene;
