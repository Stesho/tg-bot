import { Markup, Scenes } from 'telegraf';
import {
  TASK_ADD_SCENE,
  TASKS_SCENE,
} from '../../constants/scenes/tasksScenes.js';

const tasksScene = new Scenes.BaseScene(TASKS_SCENE);

tasksScene.enter((ctx) => {
  ctx.reply(
    'Tasks',
    Markup.inlineKeyboard([
      [Markup.button.callback('Show my tasks', 'get-tasks')],
      [Markup.button.callback('Add new task', 'add-task')],
    ]).resize(),
  );
});

tasksScene.action('add-task', (ctx) => {
  return ctx.scene.enter(TASK_ADD_SCENE);
});

export default tasksScene;
