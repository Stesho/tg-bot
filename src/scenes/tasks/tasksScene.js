import { Markup, Scenes } from 'telegraf';
import {
  TASK_ADD_SCENE,
  TASK_GETTING_SCENE,
  TASKS_SCENE,
} from '../../constants/scenes/tasksScenesConst.js';

const tasksScene = new Scenes.BaseScene(TASKS_SCENE);

tasksScene.enter((ctx) => {
  ctx.reply(
    'Tasks',
    Markup.inlineKeyboard([
      [Markup.button.callback('Show my tasks', TASK_GETTING_SCENE)],
      [Markup.button.callback('Add new task', TASK_ADD_SCENE)],
    ]).resize(),
  );
});

tasksScene.action(TASK_GETTING_SCENE, (ctx) => {
  return ctx.scene.enter(TASK_GETTING_SCENE);
});

tasksScene.action(TASK_ADD_SCENE, (ctx) => {
  return ctx.scene.enter(TASK_ADD_SCENE);
});

export default tasksScene;
