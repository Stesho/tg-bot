import { Composer, Markup, Scenes } from 'telegraf';
import {
  TASK_ADD_SCENE,
  TASK_GETTING_SCENE,
  TASKS_SCENE,
} from '../../constants/scenes/tasksScenesConst.js';

const tasksScene = new Scenes.BaseScene(TASKS_SCENE);

tasksScene.enter((ctx) => {
  ctx.scene.state.userId = ctx.update.message.from.id;

  ctx.reply(
    'Tasks',
    Markup.inlineKeyboard([
      [Markup.button.callback('Show my tasks', TASK_GETTING_SCENE)],
      [Markup.button.callback('Add new task', TASK_ADD_SCENE)],
    ]).resize(),
  );
});

tasksScene.action(TASK_GETTING_SCENE, (ctx) => {
  return ctx.scene.enter(TASK_GETTING_SCENE, ctx.scene.state);
});

tasksScene.action(TASK_ADD_SCENE, (ctx) => {
  return ctx.scene.enter(TASK_ADD_SCENE, ctx.scene.state);
});

export default tasksScene;
